'use server';

import { createClient } from '@/utils/supabase/server';
import { SignupFormSchema } from './types';

export async function signup(data: SignupFormSchema) {
  const supabase = await createClient();
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
