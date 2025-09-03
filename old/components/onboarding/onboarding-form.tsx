'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProfileTab } from './profile-tab'
import { GoalsTab } from './goals-tab'
import { RoutinesTab } from './routines-tab'
import { type OnboardingTab, onboardingStore } from '@/old/stores/onboarding-store'
import { JSX } from 'react'

type Tab = {
  id: OnboardingTab
  name: string
  element: JSX.Element
}

export function OnboardingForm() {
  const tabs: Tab[] = [
    { id: 'profile', name: '프로필', element: <ProfileTab /> },
    { id: 'goals', name: '목표', element: <GoalsTab /> },
    { id: 'routines', name: '루틴', element: <RoutinesTab /> },
  ]
  const { activeTab, setActiveTab } = onboardingStore()

  return (
    <Tabs
      value={activeTab}
      onValueChange={(v) => setActiveTab(v as OnboardingTab)}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        {tabs.map(({ id, name }) => (
          <TabsTrigger key={`onboarding-tab-${id}`} value={id}>
            {name}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map(({ id: name, element }) => (
        <TabsContent key={`onboarding-content-${name}`} value={name}>
          {element}
        </TabsContent>
      ))}
    </Tabs>
  )
}
