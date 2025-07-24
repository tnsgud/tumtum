import { UserErrorCode } from '../errors/user-error'

type UserErrorMessages = {
  [key in UserErrorCode]: string
}

export const userErrorMessages: UserErrorMessages = {
  // Find User
  // Id field
  ID_CAN_ONLY_BE_A_STRING: '아이디는 문자열만 가능합니다.',
  ID_IS_NOT_EXISTS: '존재하지 않는 아이디입니다.',
}
