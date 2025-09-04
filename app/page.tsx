import { LandingHero } from '@/components/landing-hero'
import { LandingFeatures } from '@/components/landing-features'
import { LandingTestimonials } from '@/components/landing-testimonials'
import { LandingCTA } from '@/components/landing-cta'
import { LandingFooter } from '@/components/landing-footer'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient();
  const {data} = await supabase.auth.getUser();

  if(data.user !== null) {
    redirect('/dashboard')
  }

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
