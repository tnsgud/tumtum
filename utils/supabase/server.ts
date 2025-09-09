import { Database } from '@/database.types';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

let client: ReturnType<typeof createServerClient<Database>> | null = null;

export async function createClient() {
  if (!client) {
    const cookieStore = await cookies();

    client = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    );
  }
  return client;
}
