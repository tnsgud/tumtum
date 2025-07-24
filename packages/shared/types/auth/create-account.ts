import { AuthError } from '../../errors'
import { ICoreOutput } from '../output.interface'

export interface ICreateAccountInput {
  nickname: string
  email: string
  password: string
}

export interface ICreateAccountOutput extends ICoreOutput {
  data: undefined
  error: AuthError | undefined
}
