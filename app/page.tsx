import { LandingHero } from '@/components/landing/landing-hero';
import { LandingFeatures } from '@/components/landing/landing-features';
import { LandingTestimonials } from '@/components/landing/landing-testimonials';
import { LandingCTA } from '@/components/landing/landing-cta';
import { LandingFooter } from '@/components/landing/landing-footer';
import { serverClient } from '@/lib/supabase.server';
import { redirect } from 'next/navigation';

export default async function Home() {
  try {
    const supabase = await serverClient();
    const { data } = await supabase.auth.getUser();

    if (data.user !== null) {
      redirect('/dashboard');
    }
  } catch (error) {
    // Supabase 연결 실패 시에도 랜딩 페이지를 보여줌
    console.error('Supabase 연결 오류:', error);
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
