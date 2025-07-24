import { UserError } from '../../errors/user-error'
import { CoreOutput } from '../outupt'
import { User } from '@tumtum/db'

export interface FindUserInput {
  id: string
}

export type FindUserOutput = CoreOutput<User, UserError>
