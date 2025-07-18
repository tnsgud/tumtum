import { UserError } from '../../errors'
import { ICoreOutput } from '../output.interface'

export interface IRefreshInput {
  refreshToken: string
}

export interface IRefreshOutput extends ICoreOutput {
  data: { accessToken: string } | undefined
  error: UserError | undefined
}
