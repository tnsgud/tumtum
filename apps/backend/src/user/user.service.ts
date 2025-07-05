import { Injectable } from '@nestjs/common'
import { CreateAccountDto, CreateAccountOutput } from './dto/create-account.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserErrorCode } from '@tumtum/shared'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createAccount({
    email,
    password,
    username: nickname,
  }: CreateAccountDto): Promise<CreateAccountOutput> {
    const output: CreateAccountOutput = {
      ok: false,
      error: {},
    }
    try {
      const exists = await this.prisma.user.findUnique({ where: { email } })

      if (exists) {
        output.error = UserErrorCode.EMAIL_EXISTS
        return output
      }

      const result = await this.prisma.createUserWithHashedPassword({
        data: {
          email,
          nickname,
          password,
        },
      })

      output.ok = true
    } catch (error) {
      output.error = error
    }

    return output
  }

  async findUserById(id: string) {
    const output = {}

    try {
      const row = await this.prisma.user.findUnique({ where: { id } })

      if (!row) {
      }
    } catch (error) {}
  }
}
