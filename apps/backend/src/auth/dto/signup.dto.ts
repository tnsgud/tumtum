import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_LENGTH_ERROR_MESSAGE,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR_MESSAGE,
} from '@tumtum/shared'

import { IsEmail, IsString, Matches, MinLength } from 'class-validator'
import { CoreOutput } from 'src/common/dto/output.dto'

export class SignupInputDto {
  @IsString()
  username: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(PASSWORD_MIN_LENGTH, { message: PASSWORD_LENGTH_ERROR_MESSAGE })
  @Matches(PASSWORD_REGEX, { message: PASSWORD_REGEX_ERROR_MESSAGE })
  password: string
}

export class SignupOutput extends CoreOutput {}
