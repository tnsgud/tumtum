import { PASSWORD_MIN_LENGTH } from '../constants'
import { AuthErrorCode } from '../errors'

type AuthErrorMessage = {
  [key in AuthErrorCode]: string
}

export const authErrorMessages: AuthErrorMessage = {
  [AuthErrorCode.INVALID_NICKNAME]: '유효하지 않는 닉네임입니다.',
  [AuthErrorCode.EMAIL_ALREADY_EXISTS]: '이미 존재하는 이메일입니다',
  [AuthErrorCode.WEAK_PASSWORD]:
    '비밀번호는 소문자, 대문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.',
  [AuthErrorCode.PASSWORD_IS_SHORT]: `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자리 이상이여야 합니다.`,
  [AuthErrorCode.NOT_INVALID_EMAIL]: '유효하지 않는 이메일입니다.',
  [AuthErrorCode.NOT_REGISTERED_EMAIL]: '회원가입되지 않는 이메일입니다.',
  [AuthErrorCode.NOT_MATCHED_PASSWORD]: '비밀번호가 일치하지 않습니다.',
  [AuthErrorCode.NOT_MATCHED_JTI]: '발급한 토큰 아이디가 다릅니다',
}
