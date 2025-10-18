import { Mission } from '@/components/mission/types';
import { browserClient } from '@/lib/supabase.browser';
import { create } from 'zustand';

interface MissionStore {
  missions: Mission[]
  setMissions: (v: Mission[]) => void
  init: boolean
  refresh: (v?: boolean) => Promise<void>
}

const useMissionStore = create<MissionStore>((set, get) => ({
  missions: [],
  setMissions: (v) => set({ missions: v }),
  init: false,
  refresh: async (value?: boolean) => {
    const supabase = browserClient();
    const {data, error} = await supabase
      .from('mission')
      .select(
        'id, title, deadline_at, is_completed, priority, category(color, name)'
      )
      .is('deleted_at', null).order('created_at', {ascending: false});
    
    if (data) {
      set(state => ({
        missions: data,
        init: value ?? state.init
      }))
    }
   },
}));

export {useMissionStore}