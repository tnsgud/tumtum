import { CoreOutput } from '../outupt'
import { AuthError } from '../../errors/auth-error'

export interface ILoginInput {
  email: string
  password: string
}

export type LoginOutput = CoreOutput<string, AuthError>
