import { serverClient } from '@/lib/supabase.server'

const getMissionCount = async () => {
  const supabase = await serverClient(); 
  const { data } = await supabase.from('mission').select('id').is('deleted_at', null);

  if (!data) return 0;

  return data.length;
}



export { getMissionCount }