'use client'

import { customFetch } from '@/lib/custom-fetch'
import { authStore } from '@/stores/access-token-store'
import { useEffect, useState } from 'react'

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { isLoggedIn, token, login, logout } = authStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initalizeAuth = async () => {
      if (isLoggedIn && token) {
        setIsLoading(false)
        return
      }

      try {
        const res = await customFetch('/auth/refresh')
        console.log(res)
      } catch (error) {
        logout()
      } finally {
        setIsLoading(false)
      }
    }

    initalizeAuth()
  })

  return <>{children}</>
}
