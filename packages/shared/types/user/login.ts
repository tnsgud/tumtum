import { UserError } from '../../errors'
import { ICoreOutput } from '../output.interface'

export interface ILoginInput {
  email: string
  password: string
}

export interface ILoginOutput extends ICoreOutput {
  data: { accessToken: string; refreshToken: string } | undefined
  error: UserError | undefined
}
