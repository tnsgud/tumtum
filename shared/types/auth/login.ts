import { ICoreOutput } from '../output.interface'
import { AuthError } from '../../errors/auth'

export interface ILoginInput {
  email: string
  password: string
}

export interface ILoginOutput extends ICoreOutput {
  data: { accessToken: string } | undefined
  error: AuthError | undefined
}
