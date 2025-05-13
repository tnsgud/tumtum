import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_LENGTH_ERROR_MESSAGE,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR_MESSAGE,
  ICreateAccountOutput,
  ICreateAccountInput,
  UserErrorCode,
} from '@tumtum/shared'

import { IsEmail, IsString, Matches, MinLength } from 'class-validator'

export class CreateAccountDto implements ICreateAccountInput {
  @IsString()
  username: string

  @IsString()
  nickname: string

  @IsEmail()
  email: string

  // TODO: 현재 response가 output 형식에 맞지 않기에 수정해야함 ex) filter를 써야한다고 함
  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH, { message: PASSWORD_LENGTH_ERROR_MESSAGE })
  @Matches(PASSWORD_REGEX, { message: PASSWORD_REGEX_ERROR_MESSAGE })
  password: string
}

export class CreateAccountOutput implements ICreateAccountOutput {
  ok: boolean
  error?: UserErrorCode | undefined
}
