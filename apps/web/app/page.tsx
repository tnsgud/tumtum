'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LandingHero } from '@/components/landing-hero'
import { LandingFeatures } from '@/components/landing-features'
import { LandingTestimonials } from '@/components/landing-testimonials'
import { LandingCTA } from '@/components/landing-cta'
import { LandingFooter } from '@/components/landing-footer'

// 실제 구현에서는 서버 컴포넌트나 미들웨어를 통해 인증 상태를 확인해야 합니다
// 이 예제에서는 클라이언트 사이드에서 간단히 구현합니다
export default function Home() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 실제 구현에서는 세션/쿠키 등을 확인하는 로직이 필요합니다
    // 예시를 위해 로그인 상태를 false로 설정
    setIsLoggedIn(false)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-rose-500 text-2xl font-bold">
          텀텀
        </div>
      </div>
    )
  }

  if (isLoggedIn) {
    router.push('/dashboard')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHero />
      <LandingFeatures />
      <LandingTestimonials />
      <LandingCTA />

      <LandingFooter />
    </div>
  )
}
