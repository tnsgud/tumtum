'use client';

import { createClient } from '@/utils/supabase/client';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export function LaterButton() {
  const router = useRouter();
  const supabase = createClient();
  const handleOnClick = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase.from('onboarding_check').insert({
      user_id: user?.id,
    });
    router.push('/dashboard');
  };

  return (
    <Button variant='outline' onClick={handleOnClick}>
      나중에 하기
    </Button>
  );
}
