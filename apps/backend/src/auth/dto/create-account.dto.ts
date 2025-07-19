import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  ICreateAccountOutput,
  ICreateAccountInput,
  UserError,
  UserErrorCode,
  userErrorMessages,
} from '@tumtum/shared'

import { IsEmail, IsString, Matches, MinLength } from 'class-validator'

export class CreateAccountDto implements ICreateAccountInput {
  @IsString({
    message: userErrorMessages[UserErrorCode.USERNAME_CAN_ONLY_BE_A_STRING],
  })
  username: string

  @IsString({
    message: userErrorMessages[UserErrorCode.NICKNAME_CAN_ONLY_BE_A_STRING],
  })
  nickname: string

  @IsString({
    message: userErrorMessages[UserErrorCode.EMAIL_CAN_ONLY_BE_A_STRING],
  })
  @IsEmail(
    {},
    { message: userErrorMessages[UserErrorCode.EMAIL_IS_NOT_VALIDATE] },
  )
  email: string

  // TODO: 현재 response가 output 형식에 맞지 않기에 수정해야함 ex) filter를 써야한다고 함
  @Matches(PASSWORD_REGEX, { message: UserErrorCode.WEAK_PASSWORD })
  @MinLength(PASSWORD_MIN_LENGTH, { message: UserErrorCode.PASSWORD_IS_SHORT })
  @IsString({
    message: UserErrorCode.PASSWORD_IS_NOT_EXISTS,
  })
  password: string
}

export class CreateAccountOutput implements ICreateAccountOutput {
  ok: boolean
  data: undefined
  error: UserError | undefined

  constructor() {
    this.ok = false
    this.data = undefined
    this.error = undefined
  }
}
