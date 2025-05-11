'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Github, Mail } from 'lucide-react'

interface FormItem {
  label: string
  id: string
  placeholder: string
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

export function SignupForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const formItems: FormItem[] = [
    {
      id: 'name',
      label: '이름',
      placeholder: '홍길동',
      state: name,
      setState: setName,
    },
    {
      id: 'email',
      label: '이메일',
      placeholder: 'name@example.com',
      state: email,
      setState: setEmail,
    },
    {
      id: 'password',
      label: '비밀번호',
      placeholder: '',
      state: password,
      setState: setPassword,
    },
    {
      id: 'confirmPassword',
      label: '비밀번호 확인',
      placeholder: '',
      state: confirmPassword,
      setState: setConfirmPassword,
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ name, email, password, confirmPassword })
    // 회원가입 로직 구현
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {formItems.map((val) => (
          <div key={`signup-form-item-${val.id}`} className="space-y-2">
            <Label htmlFor="name">{val.label}</Label>
            <Input
              id={val.id}
              placeholder={val.placeholder}
              value={val.state}
              onChange={(e) => val.setState(e.target.value)}
              required
            />
          </div>
        ))}

        <Button
          type="submit"
          className="w-full bg-rose-500 hover:bg-rose-600 text-white"
        >
          회원가입
        </Button>
      </form>

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
