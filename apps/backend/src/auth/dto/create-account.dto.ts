import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  CreateAccountInput,
  authErrorMessages,
} from '@tumtum/shared'

import { IsEmail, IsString, Matches, MinLength } from 'class-validator'

export class CreateAccountDto implements CreateAccountInput {
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
