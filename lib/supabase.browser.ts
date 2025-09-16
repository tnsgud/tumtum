import { Database } from '@/database.types';
import { createBrowserClient } from '@supabase/ssr';

function browserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

export { browserClient };
