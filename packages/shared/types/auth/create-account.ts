import { AuthError } from '../../errors'
import { CoreOutput } from '../outupt'

export type CreateAccountInput = {
  nickname: string
  email: string
  password: string
}

export type CreateAccountOutput = CoreOutput<undefined, AuthError>
