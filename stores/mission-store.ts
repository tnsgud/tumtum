import { Mission } from '@/components/mission/types';
import { create } from 'zustand';

interface MissionStore {
  missions: Mission[]
  setMissions: (v:Mission[]) => void
}

const useMissionStore = create<MissionStore>((set) => ({
  missions: [],
  setMissions: (v) => set({missions: v}) 
}));

export {useMissionStore}