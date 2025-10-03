import {serverClient} from '@/lib/supabase.server'

const getMissions = async () => {
  const supabase = await serverClient();
  const {data, error} = await supabase
    .from('mission')
    .select(
      'id, title, deadline_at, is_completed, priority, category(color, name)'
    )
    .is('deleted_at', null);

  if (error) {
    throw error;
  }

  return data ?? [];
}

export { getMissions}