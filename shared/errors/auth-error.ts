import { CoreError } from './core-error'

export enum AuthErrorCode {
  // Login
  // not validate email
  NOT_VALIDATED_EMAIL = 'NOT_VALIDATED_EMAIL',
  // Not registered email
  NOT_REGISTERED_EMAIL = 'NOT_REGISTERED_EMAIL',
  // not matched password
  NOT_MATCHED_PASSWORD = 'NOT_MATCHED_PASSWORD',

  // Refresh
  // not matched jti
  NOT_MATCHED_JTI = 'NOT_MATCHED_JTI',
}

export class AuthError extends CoreError {}
