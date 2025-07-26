'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { ProfileTab } from './profile-tab'
import { GoalsTab } from './goals-tab'

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

      <TabsContent value="routines" className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label>일일 루틴 설정</Label>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="routine1" />
                <label
                  htmlFor="routine1"
                  className="text-sm font-medium leading-none"
                >
                  아침 코딩 1시간
                </label>
              </div>
              <div className="mt-2 grid grid-cols-7 gap-1">
                <Button variant="outline" size="sm" className="h-8">
                  월
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  화
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  수
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  목
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  금
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  토
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  일
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="routine2" />
                <label
                  htmlFor="routine2"
                  className="text-sm font-medium leading-none"
                >
                  기술 블로그 작성
                </label>
              </div>
              <div className="mt-2 grid grid-cols-7 gap-1">
                <Button variant="outline" size="sm" className="h-8">
                  월
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  화
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  수
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  목
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  금
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  토
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  일
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="routine3" />
                <label
                  htmlFor="routine3"
                  className="text-sm font-medium leading-none"
                >
                  알고리즘 문제 풀기
                </label>
              </div>
              <div className="mt-2 grid grid-cols-7 gap-1">
                <Button variant="outline" size="sm" className="h-8">
                  월
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  화
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  수
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  목
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  금
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  토
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  일
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button onClick={handlePrevTab} variant="outline">
            이전
          </Button>
          <Button className="bg-rose-500 hover:bg-rose-600 text-white">
            완료
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  )
}
