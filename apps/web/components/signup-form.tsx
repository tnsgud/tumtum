'use client'

import type React from 'react'

import { z } from 'zod'

import {
  ICreateAccountInput,
  ICreateAccountOutput,
  PASSWORD_LENGTH_ERROR_MESSAGE,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR_MESSAGE,
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
  username: z.string({ required_error: '필수 요소 입니다.' }),
  nickname: z.string({ required_error: '필수 요소 입니다.' }),
  email: z
    .string({ required_error: '필수 요소 입니다.' })
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z
    .string({ required_error: '필수 요소 입니다.' })
    .min(PASSWORD_MIN_LENGTH, PASSWORD_LENGTH_ERROR_MESSAGE)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR_MESSAGE),
  confirmPassword: z
    .string({ required_error: '필수 요소 입니다.' })
    .min(PASSWORD_MIN_LENGTH, PASSWORD_LENGTH_ERROR_MESSAGE)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR_MESSAGE),
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
    name: 'username',
    label: '이름',
    placeholder: '홍길동',
    inputType: 'text',
  },
  {
    name: 'nickname',
    label: '닉네임',
    placeholder: '의적',
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
      username: '',
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit({
    username,
    nickname,
    email,
    password,
    confirmPassword,
  }: SignupFormSchema) {
    if (password !== confirmPassword) {
      form.setError('confirmPassword', {
        message: '비밀번호가 일치하지 않습니다.',
      })
      return
    }

    const data: ICreateAccountInput = {
      username,
      nickname,
      email,
      password,
    }

    const { ok } = await customFetch<ICreateAccountOutput>(
      '/users/create-account',
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
    )

    if (!ok) {
      return
    }

    router.replace('/login')
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
