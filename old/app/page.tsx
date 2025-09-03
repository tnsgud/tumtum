'use client'

import { useRouter } from 'next/navigation'
import { LandingHero } from '@/components/landing-hero'
import { LandingFeatures } from '@/components/landing-features'
import { LandingTestimonials } from '@/components/landing-testimonials'
import { LandingCTA } from '@/components/landing-cta'
import { LandingFooter } from '@/components/landing-footer'
import { authStore } from '@/old/stores/auth-store'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  const { isLoggedIn } = authStore()

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/dashboard')
    }
  }, [isLoggedIn, router])

  return (
    <div className="flex flex-col min-h-screen mx-auto">
      <LandingHero />
      <LandingFeatures />
      <LandingTestimonials />
      <LandingCTA />

      <LandingFooter />
    </div>
  )
}
