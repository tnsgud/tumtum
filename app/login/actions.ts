'use server';

import { LoginFormSchema } from '@/app/login/types';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function login({ email, password }: LoginFormSchema) {
  const supabase = await createClient();
  return await supabase.auth.signInWithPassword({ email, password });
}
