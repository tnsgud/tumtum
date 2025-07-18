import { Injectable } from '@nestjs/common'
import { CreateAccountDto, CreateAccountOutput } from './dto/create-account.dto'
import { PrismaService } from '../prisma/prisma.service'
import { UserError, UserErrorCode } from '@tumtum/shared'
import { FindUserDto, FindUserOutput } from './dto/find-user.dto'
import { LoginDto, LoginOutput } from './dto/login.dto'
import * as bcrypt from 'bcrypt'
import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async createAccount({
    email,
    password,
    username: nickname,
  }: CreateAccountDto): Promise<CreateAccountOutput> {
    const output = new CreateAccountOutput()
    try {
      const exists = await this.prismaService.user.findUnique({
        where: { email },
      })

      if (exists) {
        output.error = new UserError(UserErrorCode.EMAIL_EXISTS)
        return output
      }

      // WEAK_PASSWORD, INVALID_NICKNAME 관련 에러처리해야함
      const result = await this.prismaService.createUserWithHashedPassword({
        data: {
          email,
          nickname,
          password,
        },
      })

      output.ok = true
    } catch (error) {
      console.log(error)
    }

    return output
  }

  // dto에서 뭐가 와야 할까? email, password로 로그인 시키자
  // login을 시도한 시간도 필요할듯 for logging and token exp
  async login({
    email,
    password,
  }: LoginDto): Promise<{ output: LoginOutput; refreshToken: string }> {
    const output = new LoginOutput()
    let refreshToken = ''

    try {
      // salt가 필요할 듯 나중에 메소드로 만들어서 재사용가능하게 만들면 좋을듯
      // 아니 쓸모 없을 수도 쓰는 곳이 2곳 말고는 없는거 같기도함
      const user = await this.prismaService.user.findUnique({
        select: { id: true, password: true },
        where: { email },
      })

      if (!user) {
        output.error = new UserError(UserErrorCode.EMAIL_IS_NOT_EXISTS)
        return { output, refreshToken }
      }

      const ok = await bcrypt.compare(password, user.password)
      if (!ok) {
        // error code 만들어줘야 함
        output.error = new UserError(UserErrorCode.PASSWORD_IS_NOT_EXISTS)
        return { output, refreshToken }
      }

      const accessToken = this.authService.getAccessToken(user.id)
      refreshToken = await this.authService.getRefreshToken(user.id)

      output.ok = true
      output.data = {
        accessToken,
      }
    } catch (error) {
      console.log(error)
    }

    return { output, refreshToken }
  }

  async getAllUser() {
    const data = await this.prismaService.user.findMany()

    return data
  }

  async findUserById({ id }: FindUserDto): Promise<FindUserOutput> {
    const output = new FindUserOutput()

    try {
      const row = await this.prismaService.user.findUnique({ where: { id } })

      if (!row) {
        output.error = new UserError(UserErrorCode.ID_IS_NOT_EXISTS)
        return output
      }

      output.ok = true
      output.data = row
    } catch (error) {
      console.log(error)
      output.error = error
    }

    return output
  }
}
