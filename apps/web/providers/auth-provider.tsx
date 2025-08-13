'use client'

import { customFetch } from '@/lib/custom-fetch'
import { authStore } from '@/stores/auth-store'
import { RefreshOutput } from '@tumtum/shared'
import React, { useState, useEffect } from 'react'

interface Props {
  children: React.ReactNode
}

export default function AuthProvider({ children }: Props) {
  const { isLoggedIn, token, login, logout } = authStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initalizeAuth = async () => {
      console.log(isLoggedIn, token)
      if (isLoggedIn && token) {
        setIsLoading(false)
        return
      }

      try {
        const res = await customFetch<RefreshOutput>('/auth/refresh')

        if (!res.ok || res.data === undefined) {
          return
        }

        login(res.data)
      } catch (error) {
        console.log(error)
        logout()
      } finally {
        setIsLoading(false)
      }
    }

    initalizeAuth()
  }, [isLoggedIn, token, login, logout])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-rose-500 text-2xl font-bold">
          텀텀
        </div>
      </div>
    )
  }

  return <>{children}</>
}
