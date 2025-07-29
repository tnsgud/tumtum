'use client'

import { create } from 'zustand'

export interface Step1 {
  job: string
  experience: string
  interests: string[]
}

export interface Step2 {
  shortTermGoal: string
  longTermGoal: string
  requiredForGoal: string[]
}

export interface Step3 {
  routines: string[]
}

interface Routine {
  id: string
  name: string
  dateOfTheWeek: string[]
  isEdit: boolean
}

interface OnboardingStore {
  // Step 1
  job: string
  setJob: (v: string) => void
  experience: string
  setExperience: (v: string) => void
  interests: string[]
  setInterests: (v: string[]) => void
  // Step 2
  shortTermGoal: string
  setShortTermGoal: (v: string) => void
  longTermGoal: string
  setLongTermGoal: (v: string) => void
  requiredForGoal: string[]
  setRequiredForGoal: (v: string[]) => void
  // Step 3
  routines: Routine[]
  addEmptyRoutine: () => void
  setRoutine: (v: Routine) => void
  removeRoutine: (id: string) => void
  findRoutine: (id: string) => { index: number; routine: Routine }
}

export const onboardingStore = create<OnboardingStore>((set, get) => ({
  job: '',
  setJob: (job) => set({ job }),
  experience: '',
  setExperience: (experience) => set({ experience }),
  interests: [],
  setInterests: (interests) => set({ interests }),
  shortTermGoal: '',
  setShortTermGoal: (shortTermGoal) => set({ shortTermGoal }),
  longTermGoal: '',
  setLongTermGoal: (longTermGoal) => set({ longTermGoal }),
  requiredForGoal: [],
  setRequiredForGoal: (requiredForGoal) => set({ requiredForGoal }),
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
}))
