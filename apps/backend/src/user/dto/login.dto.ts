import {
  ILoginInput,
  ILoginOutput,
  UserError,
  UserErrorCode,
  userErrorMessages,
} from '@tumtum/shared'
import { IsEmail, IsString } from 'class-validator'

export class LoginDto implements ILoginInput {
  @IsString({
    message: userErrorMessages[UserErrorCode.EMAIL_CAN_ONLY_BE_A_STRING],
  })
  @IsEmail(
    {},
    { message: userErrorMessages[UserErrorCode.EMAIL_IS_NOT_VALIDATE] },
  )
  email: string

  @IsString({
    message: userErrorMessages[UserErrorCode.PASSWORD_CAN_ONLY_BE_A_STRING],
  })
  password: string
}

export class LoginOutput implements ILoginOutput {
  ok: boolean
  data: { accessToken: string; refreshToken: string } | undefined
  error: UserError | undefined

  constructor() {
    this.ok = false
    this.data = undefined
    this.error = undefined
  }
}
