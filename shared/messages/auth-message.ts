import { AuthErrorCode } from '../errors'

type AuthErrorMessage = {
  [key in AuthErrorCode]: string
}

export const authErrorMessages: AuthErrorMessage = {
  [AuthErrorCode.NOT_VALIDATED_EMAIL]: '유효하지 않는 이메일입니다.',
  [AuthErrorCode.NOT_REGISTERED_EMAIL]: '회원가입되지 않는 이메일입니다.',
  [AuthErrorCode.NOT_MATCHED_PASSWORD]: '비밀번호가 일치하지 않습니다.',
  [AuthErrorCode.NOT_MATCHED_JTI]: '발급한 토큰 아이디가 다릅니다',
}
