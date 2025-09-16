import { z } from 'zod';

export const signupFormSchema = z.object({
  nickname: z.string({ required_error: '필수 요소 입니다.' }),
  email: z
    .string({ required_error: '필수 요소 입니다.' })
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z.string({ required_error: '필수 요소 입니다.' }),
  // .min(PASSWORD_MIN_LENGTH, authErrorMessages.PASSWORD_IS_SHORT)
  // .regex(PASSWORD_REGEX, authErrorMessages.WEAK_PASSWORD),
  confirmPassword: z.string({ required_error: '필수 요소 입니다.' }),
  // .min(PASSWORD_MIN_LENGTH, authErrorMessages.PASSWORD_IS_SHORT)
  // .regex(PASSWORD_REGEX, authErrorMessages.WEAK_PASSWORD),
});

export type SignupFormSchema = z.infer<typeof signupFormSchema>;
export type SignupFormItem = {
  name: keyof SignupFormSchema;
  label: string;
  placeholder: string;
  inputType: 'text' | 'email' | 'password';
};
