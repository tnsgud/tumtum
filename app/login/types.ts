import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: '필수 요소 입니다.' })
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().trim().min(1, '필수 요소 입니다.'),
})
export type LoginFormSchema = z.infer<typeof loginFormSchema>
export type LoginFormItem = {
  name: keyof LoginFormSchema
  label: string
  placeholder: string
  inputType: 'email' | 'password'
}