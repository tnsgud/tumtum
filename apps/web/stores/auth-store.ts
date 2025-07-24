'use client'

import { create } from 'zustand'

interface AuthStore {
  isLoggedIn: boolean
  token: string | null
  nickname: string
  login: (token: string) => void
  logout: () => void
}

export const authStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  token: '',
  nickname: '',
  login: (token) => {
    const hashedPayload = token.split('.')[1]
    const payload = JSON.parse(window.atob(hashedPayload)) as {
      [key: string]: string
    }
    const { nickname } = payload
    set({ isLoggedIn: true, token, nickname })
  },
  logout: () => {
    // Remove refresh token
    set({ isLoggedIn: false, token: null })
  },
}))
