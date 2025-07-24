import { customFetch } from '@/lib/custom-fetch'
import { Mission } from '@tumtum/db'
import { FindAllMissionsOutuput } from '@tumtum/shared'
import { create } from 'zustand'

interface MissionStore {
  missions: Mission[]

  complatedMissions: Mission[]

  getMissions: () => Promise<void>
  setMission: (mission: Mission) => void

  updateComplatedMissions: () => void
}

export const missionStore = create<MissionStore>((set) => ({
  missions: [],
  complatedMissions: [],

  getMissions: async () => {
    const { ok, data, error } =
      await customFetch<FindAllMissionsOutuput>('/missions')

    if (!ok) {
      return console.log(error)
    }

    set({
      missions: data,
      complatedMissions: data?.filter((m) => m.isCompleted),
    })
  },
  setMission: (mission) => {
    set((state) => ({ missions: [...state.missions, mission] }))
  },
  updateComplatedMissions: () => {
    set((state) => ({
      complatedMissions: state.missions.filter((m) => m.isCompleted),
    }))
  },
}))
