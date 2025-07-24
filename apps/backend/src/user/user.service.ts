import { Injectable } from '@nestjs/common'
import {
  CreateAccountDto,
  CreateAccountOutput,
} from '../auth/dto/create-account.dto'
import { PrismaService } from '../prisma/prisma.service'
import { UserError, UserErrorCode } from '@tumtum/shared'
import { FindUserDto, FindUserOutput } from './dto/find-user.dto'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

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
