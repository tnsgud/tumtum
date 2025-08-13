import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import {
  CompletedOnboardingOutput,
  createFailedOutput,
  createSuccessOutput,
  FindUserOutput,
  UserError,
  UserErrorCode,
} from '@tumtum/shared'
import { FindUserDto } from './dto/find-user.dto'
import { User } from '@tumtum/db'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUser(): Promise<User[]> {
    try {
      const data = await this.prismaService.user.findMany()

      return data
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findUserById({ id }: FindUserDto): Promise<FindUserOutput> {
    try {
      const row = await this.prismaService.user.findUnique({ where: { id } })

      if (!row) {
        return createFailedOutput(new UserError(UserErrorCode.ID_IS_NOT_EXISTS))
      }

      return createSuccessOutput(row)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async changeToOnboardingComplete(
    id: string,
  ): Promise<CompletedOnboardingOutput> {
    try {
      const result = await this.prismaService.user.update({
        data: { is_onboarding_completed: true },
        where: { id },
      })
      console.log(result)
      return createSuccessOutput(undefined)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
