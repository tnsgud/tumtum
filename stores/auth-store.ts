import { create } from 'zustand'
import { User } from '@supabase/supabase-js'
import { browserClient } from '@/lib/supabase.browser';

interface LoginStateStore {
  isLoggined: boolean;
  user: User | null

  setIsLoggined: (v:boolean) => void
  setUser: (v:User) => void
}

const supabase = browserClient();
const { data: {user} } = await supabase.auth.getUser();

const useAuthStore = create<LoginStateStore>((set) => ({
  isLoggined: user === null ? false : true,
  user: user,
  setIsLoggined: (v) => set((s) => ({...s, isLoggined:v})),
  setUser: (v) => set((s) => ({...s, user:v})),
}))


export {useAuthStore}