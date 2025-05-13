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
    }
    try {
      const { client } = this.prisma
      const exists = await client.user.findUnique({ where: { email } })

      if (exists) {
        output.error = UserErrorCode.EMAIL_EXISTS
        return output
      }

      const result = await client.user.createWithHashedPassword({
        data: { email, password, nickname },
      })

      output.ok = true
    } catch (error) {
      output.error = error
    }

    return output
  }
}
