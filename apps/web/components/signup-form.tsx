'use client'

import type React from 'react'

import { z } from 'zod'

import {
  authErrorMessages,
  CreateAccountInput,
  CreateAccountOutput,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from '@tumtum/shared'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Github, Mail } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'

import { customFetch } from '@/lib/custom-fetch'
import { useRouter } from 'next/navigation'

const signupFormSchema = z.object({
  nickname: z.string({ required_error: '필수 요소 입니다.' }),
  email: z
    .string({ required_error: '필수 요소 입니다.' })
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string({ required_error: '필수 요소 입니다.' })
    .min(PASSWORD_MIN_LENGTH, authErrorMessages.PASSWORD_IS_SHORT)
    .regex(PASSWORD_REGEX, authErrorMessages.WEAK_PASSWORD),
  confirmPassword: z
    .string({ required_error: '필수 요소 입니다.' })
    .min(PASSWORD_MIN_LENGTH, authErrorMessages.PASSWORD_IS_SHORT)
    .regex(PASSWORD_REGEX, authErrorMessages.WEAK_PASSWORD),
})

type SignupFormSchema = z.infer<typeof signupFormSchema>
type SignupFormItem = {
  name: keyof SignupFormSchema
  label: string
  placeholder: string
  inputType: 'text' | 'email' | 'password'
}

const formItems: SignupFormItem[] = [
  {
    name: 'nickname',
    label: '닉네임',
    placeholder: '홍길동',
    inputType: 'text',
  },
  {
    name: 'email',
    label: '이메일',
    placeholder: 'name@example.com',
    inputType: 'email',
  },
  {
    name: 'password',
    label: '비밀번호',
    placeholder: '',
    inputType: 'password',
  },
  {
    name: 'confirmPassword',
    label: '비밀번호 확인',
    placeholder: '',
    inputType: 'password',
  },
]

export function SignupForm() {
  const router = useRouter()
  const form = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit({
    nickname,
    email,
    password,
    confirmPassword,
  }: SignupFormSchema) {
    if (password !== confirmPassword) {
      form.setError('confirmPassword', {
        message: authErrorMessages.NOT_MATCHED_PASSWORD,
      })
      return
    }

    const input: CreateAccountInput = {
      nickname,
      email,
      password,
    }

    const { ok, error } = await customFetch<CreateAccountOutput>(
      '/auth/create-account',
      {
        method: 'POST',
        body: JSON.stringify(input),
      },
    )

    if (!ok && typeof error !== 'undefined') {
      return alert(authErrorMessages[error.code])
    }

    router.push('/login')
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {formItems.map(({ name, label, placeholder, inputType }) => (
            <FormField
              key={`signup-form-item-${name}`}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">{label}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={placeholder}
                      type={inputType}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white"
          >
            회원가입
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">또는</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="w-full">
          <Github className="mr-2 h-4 w-4" />
          Github
        </Button>
        <Button variant="outline" className="w-full">
          <Mail className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
    </div>
  )
}
