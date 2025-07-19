import { UserError } from '../../errors/user-error'
import { ICoreOutput } from '../output.interface'

export interface ICreateAccountInput {
  username: string
  nickname: string
  email: string
  password: string
}

export interface ICreateAccountOutput extends ICoreOutput {
  data: undefined
  error: UserError | undefined
}
