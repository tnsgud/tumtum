export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_LENGTH_ERROR_MESSAGE = `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자리 이상이여야 합니다.`
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/
export const PASSWORD_REGEX_ERROR_MESSAGE =
  '비밀번호는 소문자, 대문자, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.'
