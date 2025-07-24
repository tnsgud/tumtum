import { FindUserInput, userErrorMessages, UserErrorCode } from '@tumtum/shared'
import { IsString } from 'class-validator'

export class FindUserDto implements FindUserInput {
  @IsString({
    message: userErrorMessages[UserErrorCode.ID_CAN_ONLY_BE_A_STRING],
  })
  id: string
}
