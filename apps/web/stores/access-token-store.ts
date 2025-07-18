'use client'

import { create } from 'zustand'

interface AuthStore {
  isLoggedIn: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
}

export const authStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  token: '',
  login: (token) => set({ isLoggedIn: true, token }),
  logout: () => {
    // Remove refresh token
    set({ isLoggedIn: false, token: null })
  },
}))
