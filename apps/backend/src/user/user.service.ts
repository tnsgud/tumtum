import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateAccountDto, CreateAccountOutput } from './dto/create-account.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserError, UserErrorCode } from '@tumtum/shared'
import { JwtService } from 'src/jwt/jwt.service'
import { FindUserDto, FindUserOutput } from './dto/find-user.dto'

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
