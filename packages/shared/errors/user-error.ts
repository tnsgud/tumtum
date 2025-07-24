import { CoreError } from './core-error'

export enum UserErrorCode {
  // Find User
  // Id field
  ID_IS_NOT_EXISTS = 'ID_IS_NOT_EXISTS',
  ID_CAN_ONLY_BE_A_STRING = 'ID_CAN_ONLY_BE_A_STRING',
}

export class UserError extends CoreError {}
