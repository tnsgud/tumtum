import {
  AuthError,
  authErrorMessages,
  ILoginInput,
  ILoginOutput,
} from '@tumtum/shared'
import { IsEmail, IsString } from 'class-validator'

export class LoginDto implements ILoginInput {
  @IsEmail({}, { message: authErrorMessages.NOT_INVALID_EMAIL })
  email: string

  @IsString()
  password: string
}

export class LoginOutput implements ILoginOutput {
  ok: boolean
  data: { accessToken: string } | undefined
  error: AuthError | undefined

  constructor() {
    this.ok = false
    this.data = undefined
    this.error = undefined
  }
}
