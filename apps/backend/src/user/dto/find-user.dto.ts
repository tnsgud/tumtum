import { User } from '@prisma/client'
import {
  UserError,
  IFindUserInput,
  IFindUserOutput,
  userErrorMessages,
  UserErrorCode,
} from '@tumtum/shared'
import { IsString } from 'class-validator'

export class FindUserDto implements IFindUserInput {
  @IsString({
    message: userErrorMessages[UserErrorCode.ID_CAN_ONLY_BE_A_STRING],
  })
  id: string
}

export class FindUserOutput implements IFindUserOutput {
  ok: boolean
  data: User | undefined
  error: UserError | undefined

  constructor() {
    this.ok = false
    this.data = undefined
    this.error = undefined
  }
}
