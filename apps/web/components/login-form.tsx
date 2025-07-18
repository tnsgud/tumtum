'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Github, Mail } from 'lucide-react'
import { customFetch } from '@/lib/custom-fetch'
import { ILoginOutput } from '@tumtum/shared'
import { redirect } from 'next/navigation'
import { authStore } from '@/stores/access-token-store'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = authStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await customFetch<ILoginOutput>('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
    })

    if (!res.ok || res.data === undefined) {
      return alert('login 실패')
    }

    login(res.data.accessToken)

    redirect('/dashboard')
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">비밀번호</Label>
            <Button
              variant="link"
              size="sm"
              className="text-xs text-rose-500 hover:text-rose-600 p-0"
            >
              비밀번호 찾기
            </Button>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-rose-500 hover:bg-rose-600 text-white"
        >
          로그인
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
