import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  ICreateAccountOutput,
  ICreateAccountInput,
  AuthError,
  authErrorMessages,
} from '@tumtum/shared'

import { IsEmail, IsString, Matches, MinLength } from 'class-validator'

export class CreateAccountDto implements ICreateAccountInput {
  @IsString()
  nickname: string

  @IsEmail({}, { message: authErrorMessages.NOT_INVALID_EMAIL })
  email: string

  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH, {
    message: authErrorMessages.PASSWORD_IS_SHORT,
  })
  @Matches(PASSWORD_REGEX, { message: authErrorMessages.WEAK_PASSWORD })
  password: string
}

export class CreateAccountOutput implements ICreateAccountOutput {
  ok: boolean
  data: undefined
  error: AuthError | undefined

  constructor() {
    this.ok = false
    this.data = undefined
    this.error = undefined
  }
}
