'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Github, Mail } from 'lucide-react'
import { customFetch } from '@/lib/custom-fetch'
import {
  authErrorMessages,
  CoreOutput,
  LoginOutput,
  UserError,
} from '@tumtum/shared'
import { useRouter } from 'next/navigation'
import { authStore } from '@/stores/auth-store'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'

const loginFormSchema = z.object({
  email: z
    .string({ required_error: '필수 요소 입니다.' })
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().trim().min(1, '필수 요소 입니다.'),
})

type LoginFormSchema = z.infer<typeof loginFormSchema>
type LoginFormItem = {
  name: keyof LoginFormSchema
  label: string
  placeholder: string
  inputType: 'email' | 'password'
}

const formItems: LoginFormItem[] = [
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
]

export function LoginForm() {
  const router = useRouter()
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { login } = authStore()

  const onSubmit = async ({ email, password }: LoginFormSchema) => {
    const loginResponse = await customFetch<LoginOutput>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
    })

    if (!loginResponse.ok) {
      return alert(authErrorMessages[loginResponse.error.code])
    }

    login(loginResponse.data)

    const onboardingStatusResponse = await customFetch<
      CoreOutput<boolean, UserError>
    >('/users/me/onboarding-status')

    if (!onboardingStatusResponse.ok) {
      return alert('온보딩 에러')
    }

    if (!onboardingStatusResponse.data) {
      return router.push('/onboarding')
    }

    router.push('/dashboard')
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {formItems.map(({ name, label, placeholder, inputType }) => (
            <FormField
              key={`login-form-item-${name}`}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={placeholder}
                      type={inputType}
                    />
                  </FormControl>
                  <FormMessage />
                  {name === 'password' && (
                    <Button
                      variant="link"
                      size="sm"
                      className="text-xs text-rose-500 hover:text-rose-600 p-0 justify-end"
                    >
                      비밀번호 찾기
                    </Button>
                  )}
                </FormItem>
              )}
            />
          ))}
          <Button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 text-white"
          >
            로그인
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
