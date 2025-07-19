import { PASSWORD_MIN_LENGTH } from '../../constants/user'
import { UserErrorCode } from '../../errors/user'

type UserErrorMessages = {
  [key in UserErrorCode]: string
}

export const userErrorMessages: UserErrorMessages = {
  // Create Account
  // Username field
  USERNAME_IS_NOT_EXISTS: 'input에 이름이 존재하지 않습니다.',
  USERNAME_CAN_ONLY_BE_A_STRING: '이름은 문자열만 가능합니다',
  // Nickname field
  INVALID_NICKNAME: '유효하지 않는 닉네임입니다.',
  NICKNAME_IS_NOT_EXISTS: 'input에 닉네임이 존재하지 않습니다.',
  NICKNAME_CAN_ONLY_BE_A_STRING: '닉네임은 문자열만 가능합니다.',
  // Email field
  EMAIL_EXISTS: '이미 존재하는 이메일입니다',
  EMAIL_IS_NOT_VALIDATE: '유효하지 않는 이메일입니다',
  EMAIL_IS_NOT_EXISTS: 'input에 이메일이 없습니다.',
  EMAIL_CAN_ONLY_BE_A_STRING: '이메일은 문자열만 가능합니다.',
  // Password field
  WEAK_PASSWORD:
    '비밀번호는 소문자, 대문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.',
  PASSWORD_IS_SHORT: `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자리 이상이여야 합니다.`,
  PASSWORD_IS_NOT_EXISTS: 'input에 비밀번호가 존재하지 않습니다.',
  PASSWORD_CAN_ONLY_BE_A_STRING: '비밀번호는 문자열만 가능합니다.',

  // Find User
  // Id field
  ID_CAN_ONLY_BE_A_STRING: '아이디는 문자열만 가능합니다.',
  ID_IS_NOT_EXISTS: '존재하지 않는 아이디입니다.',
}
