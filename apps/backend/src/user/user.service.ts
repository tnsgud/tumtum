import { Injectable } from '@nestjs/common'
import { CreateAccountDto, CreateAccountOutput } from './dto/create-account.dto'
import { PrismaService } from '../prisma/prisma.service'
import { UserError, UserErrorCode } from '@tumtum/shared'
import { JwtService } from '../jwt/jwt.service'
import { FindUserDto, FindUserOutput } from './dto/find-user.dto'
import { LoginDto, LoginOutput } from './dto/login.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    username: nickname,
  }: CreateAccountDto): Promise<CreateAccountOutput> {
    const output = new CreateAccountOutput()
    try {
      const exists = await this.prisma.user.findUnique({ where: { email } })

      if (exists) {
        output.error = new UserError(UserErrorCode.EMAIL_EXISTS)
        return output
      }

      // WEAK_PASSWORD, INVALID_NICKNAME 관련 에러처리해야함
      const result = await this.prisma.createUserWithHashedPassword({
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
  async login({ email, password }: LoginDto): Promise<LoginOutput> {
    const output = new LoginOutput()

    try {
      // salt가 필요할 듯 나중에 메소드로 만들어서 재사용가능하게 만들면 좋을듯
      // 아니 쓸모 없을 수도 쓰는 곳이 2곳 말고는 없는거 같기도함
      const user = await this.prisma.user.findUnique({
        select: { id: true, password: true },
        where: { email },
      })

      if (!user) {
        output.error = new UserError(UserErrorCode.EMAIL_IS_NOT_EXISTS)
        return output
      }

      const ok = await bcrypt.compare(password, user.password)
      if (!ok) {
        // error code 만들어줘야 함
        output.error = new UserError(UserErrorCode.PASSWORD_IS_NOT_EXISTS)
        return output
      }

      const accessPayload = {
        id: user.id,
        exp: Date.now() + 600 * 60 * 5,
      }
      const refreshPayload = {
        id: user.id,
        exp: Date.now() + 600 * 60 * 60 * 5,
      }

      const accessToken = this.jwtService.sign(accessPayload)
      const refreshToken = this.jwtService.sign(refreshPayload)

      output.ok = true
      output.data = {
        accessToken,
        refreshToken,
      }
    } catch (error) {
      console.log(error)
    }

    return output
  }

  async getAllUser() {
    const data = await this.prisma.user.findMany()

    return data
  }

  async findUserById({ id }: FindUserDto): Promise<FindUserOutput> {
    const output = new FindUserOutput()

    try {
      const row = await this.prisma.user.findUnique({ where: { id } })

      if (!row) throw new Error()

      output.ok = true
      output.data = row
    } catch (error) {
      output.error = error
    }

    return output
  }
}
