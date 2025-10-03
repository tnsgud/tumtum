import { create } from 'zustand'
import { User } from '@supabase/supabase-js'

interface LoginStateStore {
  isLoggined: boolean;
  user: User | null

  setIsLoggined: (v:boolean) => void
  setUser: (v:User) => void
}

const useAuthStore = create<LoginStateStore>((set) => {
  return {
  isLoggined:false ,
  user: null,
  setIsLoggined: (v) => set((s) => ({...s, isLoggined:v})),
  setUser: (v) => set((s) => ({...s, user:v})),
} 
})


export {useAuthStore}