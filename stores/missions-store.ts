'use client'

import { create } from 'zustand'
import { customFetch } from '@/lib/custom-fetch'
import { CustomMission, GetAllMissionsOutput } from '@tumtum/shared'

interface MissionsStore {
  missions: CustomMission[]
  getMissions: () => Promise<void>
}

export const missionsStore = create<MissionsStore>((set) => ({
  missions: [],
  getMissions: async () => {
    const { ok, data } = await customFetch<GetAllMissionsOutput>('/missions')

    if (!ok) return

    console.log(data)

    set({ missions: data })
  },
}))
