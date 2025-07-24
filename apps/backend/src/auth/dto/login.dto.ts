import { authErrorMessages, ILoginInput } from '@tumtum/shared'
import { IsEmail, IsString } from 'class-validator'

export class LoginDto implements ILoginInput {
  @IsEmail({}, { message: authErrorMessages.NOT_INVALID_EMAIL })
  email: string

  @IsString()
  password: string
}
