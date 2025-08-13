import { User } from '@tumtum/db'

export interface CustomRequest extends Request {
  user: User
}
