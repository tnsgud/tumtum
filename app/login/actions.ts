'use server';

import { LoginFormSchema } from '@/app/login/types';
import { serverClient } from '@/lib/supabase.server';

export async function login({ email, password }: LoginFormSchema) {
  const supabase = await serverClient();
  return await supabase.auth.signInWithPassword({ email, password });
}
