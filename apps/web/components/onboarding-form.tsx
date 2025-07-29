'use client'

import type React from 'react'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProfileTab } from './profile-tab'
import { GoalsTab } from './goals-tab'
import { RoutinesTab } from './routines-tab'

export function OnboardingForm() {
  const [activeTab, setActiveTab] = useState('profile')

  const handleNextTab = () => {
    if (activeTab === 'profile') {
      setActiveTab('goals')
    } else if (activeTab === 'goals') {
      setActiveTab('routines')
    } else if (activeTab === 'routines') {
      // 온보딩 완료 처리
      console.log('온보딩 완료')
    }
  }

  const handlePrevTab = () => {
    if (activeTab === 'goals') {
      setActiveTab('profile')
    } else if (activeTab === 'routines') {
      setActiveTab('goals')
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">프로필</TabsTrigger>
        <TabsTrigger value="goals">목표</TabsTrigger>
        <TabsTrigger value="routines">루틴</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <ProfileTab handleNextTab={handleNextTab} />
      </TabsContent>

      <TabsContent value="goals">
        <GoalsTab onPrev={handlePrevTab} onNext={handleNextTab} />
      </TabsContent>

      <TabsContent value="routines">
        <RoutinesTab onPrev={handlePrevTab} />
      </TabsContent>
    </Tabs>
  )
}
