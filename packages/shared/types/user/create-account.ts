import { UserErrorCode } from '../../user/user.error-code'
import { ICoreOutput } from '../output.interface'

export interface ICreateAccountInput {
  username: string
  nickname: string
  email: string
  password: string
}

export interface ICreateAccountOutput extends ICoreOutput<UserErrorCode> {}
