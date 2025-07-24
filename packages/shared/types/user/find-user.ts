import { UserError } from '../../errors/user-error'
import { ICoreOutput } from '../output.interface'

export interface IFindUserInput {
  id: string
}

export interface IFindUserOutput extends ICoreOutput {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data: any
  error: UserError | undefined
}
