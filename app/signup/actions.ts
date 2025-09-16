'use server';

import { serverClient } from '@/lib/supabase.server';
import { SignupFormSchema } from './types';

export async function signup(data: SignupFormSchema) {
  const supabase = await serverClient();
  return await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        display_name: data.nickname,
      },
    },
  });
}
