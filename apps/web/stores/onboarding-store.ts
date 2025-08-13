'use client'

import { create } from 'zustand'

export type OnboardingTab = 'profile' | 'goals' | 'routines'

interface Routine {
  id: string
  name: string
  dateOfTheWeek: string[]
  isEdit: boolean
}

interface OnboardingStore {
  activeTab: OnboardingTab
  setActiveTab: (v: OnboardingTab) => void
  onNextTab: () => void
  onPrevTab: () => void
  // Profile Tab
  job: string
  setJob: (v: string) => void
  experience: string
  setExperience: (v: string) => void
  interests: string[]
  setInterests: (v: string[]) => void
  // profileValidate: () => boolean
  // Goals Tab
  shortTermGoal: string
  setShortTermGoal: (v: string) => void
  longTermGoal: string
  setLongTermGoal: (v: string) => void
  requiredForGoal: string[]
  setRequiredForGoal: (v: string[]) => void
  // GoalsValidate: () => boolean
  // Routines Tab
  routines: Routine[]
  addEmptyRoutine: () => void
  setRoutine: (v: Routine) => void
  removeRoutine: (id: string) => void
  findRoutine: (id: string) => { index: number; routine: Routine }
  // routinesValidate: () => boolean
}

export const onboardingStore = create<OnboardingStore>((set, get) => ({
  activeTab: 'profile',
  setActiveTab: (activeTab) => set({ activeTab }),
  onNextTab: () => {
    // const { activeTab, profileValidate, goalsValidate } = get()
    const { activeTab } = get()

    if (activeTab === 'profile') {
      // const result = profileValidate()
      // if (!result) return

      return set({ activeTab: 'goals' })
    }

    if (activeTab === 'goals') {
      return set({ activeTab: 'routines' })
    }
  },
  onPrevTab: () => {
    const { activeTab } = get()
    if (activeTab === 'goals') {
      set({ activeTab: 'profile' })
    } else if (activeTab === 'routines') {
      set({ activeTab: 'goals' })
    }
  },
  job: '',
  setJob: (job) => set({ job }),
  experience: '',
  setExperience: (experience) => set({ experience }),
  interests: [],
  setInterests: (interests) => set({ interests }),
  // profileValidate: () => true,
  shortTermGoal: '',
  setShortTermGoal: (shortTermGoal) => set({ shortTermGoal }),
  longTermGoal: '',
  setLongTermGoal: (longTermGoal) => set({ longTermGoal }),
  requiredForGoal: [],
  setRequiredForGoal: (requiredForGoal) => set({ requiredForGoal }),
  // goalsValidate: () => true,
  routines: [
    {
      id: 'routine-0',
      name: '아침 코딩 1시간',
      dateOfTheWeek: [],
      isEdit: false,
    },
  ],
  addEmptyRoutine: () =>
    set((state) => ({
      routines: [
        ...state.routines,
        {
          id: `routine-${state.routines.length}`,
          name: '',
          dateOfTheWeek: [],
          isEdit: true,
        },
      ],
    })),
  setRoutine: (routine) => {
    const { routines } = get()
    const index = routines.findIndex((r) => r.id === routine.id)

    set({
      routines: [
        ...routines.slice(0, index),
        routine,
        ...routines.slice(index + 1, routines.length),
      ],
    })
  },
  removeRoutine: (id) => {
    const { routines } = get()
    set({
      routines: [
        ...routines
          .filter((r) => r.id !== id)
          .map((r, i) => {
            r.id = `routine-${i}`
            return r
          }),
      ],
    })
  },
  findRoutine: (id) => {
    const index = get().routines.findIndex((r) => r.id === id)

    return {
      index,
      routine: get().routines[index],
    }
  },
  // routinesValidate: () => true,
}))
