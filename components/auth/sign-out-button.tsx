'use client'

import { browserClient } from "@/lib/supabase.browser"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/auth-store"

const SignOutButton = () => {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const onClick = async () => {
    const sb = browserClient();
    const { error } = await sb.auth.signOut();

    if (error) {
      alert('문제가 발생했습니다. 관리자한테 문의해주세요.')
      return;
    }

    alert('로그아웃 되었습니다.')
    logout();
    router.replace('/')
  }

  return <Button variant={'outline'} onClick={onClick}>로그아웃</Button>
}


export {SignOutButton}