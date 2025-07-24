import {
  AuthError,
  IRefreshInput,
  IRefreshOutput,
  UserError,
} from '@tumtum/shared'
import { IsString } from 'class-validator'

export class RefreshDto implements IRefreshInput {
  @IsString()
  refreshToken: string

  constructor(refreshToken: string) {
    this.refreshToken = refreshToken
  }
}

export class RefreshOutput implements IRefreshOutput {
  data: { accessToken: string } | undefined
  error: AuthError | undefined
  ok: boolean

  constructor() {
    this.ok = false
    this.data = undefined
    this.error = undefined
  }
}
