import { LandingHero } from '@/components/landing/landing-hero';
import { LandingFeatures } from '@/components/landing/landing-features';
import { LandingTestimonials } from '@/components/landing/landing-testimonials';
import { LandingCTA } from '@/components/landing/landing-cta';
import { LandingFooter } from '@/components/landing/landing-footer';
import { serverClient } from '@/lib/supabase.server';
import { redirect } from 'next/navigation';

export default async function Home() {
    const supabase = await serverClient();
    const { data } = await supabase.auth.getUser();

    if (data.user !== null) {
      redirect('/dashboard');
    }

  return (
    <div className='flex flex-col min-h-screen mx-auto'>
      <LandingHero />
      <LandingFeatures />
      <LandingTestimonials />
      <LandingCTA />

      <LandingFooter />
    </div>
  );
}
