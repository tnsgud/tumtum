import { AuthError } from '../../errors'
import { CoreOutput } from '../outupt'

export type RefreshOutput = CoreOutput<string, AuthError>
