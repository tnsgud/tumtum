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

interface OnboardingStore {
  job: string
  setJob: (v: string) => void
  experience: string
  setExperience: (v: string) => void
  interests: string[]
  setInterests: (v: string[]) => void
  shortTermGoal: string
  setShortTermGoal: (v: string) => void
  longTermGoal: string
  setLongTermGoal: (v: string) => void
  requiredForGoal: string[]
  setRequiredForGoal: (v: string[]) => void
  //step1: Step1
  // step2: Step2
  step3: Step3
  //setStep1: (data: Partial<Step1>) => void
  // setStep2: (data: Step2) => void
  setStep3: (data: Step3) => void
}

export const onboardingStore = create<OnboardingStore>((set) => ({
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
  /*step1: {
    job: '',
    experience: '',
    interests: [],
  },
  step2: {
    shortTermGoal: '',
    longTermGoal: '',
    requiredForGoal: [],
  },
  */
  step3: {
    routines: [],
  },
  /*setStep1: (data) => {
    console.log(data)

    set(({ step1 }) => ({
      step1: {
        job: data.job ?? step1.job,
        experience: data.experience ?? step1.experience,
        interests: data.interests ?? step1.interests,
      },
    }))
  },
  setStep2: (data) => set({ step2: data }),
  */
  setStep3: (data) => set({ step3: data }),
}))
