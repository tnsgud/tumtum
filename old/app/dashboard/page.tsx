'use client'

import { DailyMissions } from '@/components/daily-missions'
import { EmotionCheck } from '@/components/emotion-check'
import { GrowthGraph } from '@/components/growth-graph'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { authStore } from '@/old/stores/auth-store'
import { missionsStore } from '@/old/stores/missions-store'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Home() {
  const { getMissions } = missionsStore()
  const { nickname } = authStore()

  useEffect(() => {
    getMissions()
  }, [getMissions])

  return (
    <div className="container px-4 py-6 space-y-8">
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              안녕하세요, {nickname}님 👋
            </h1>
            <p className="text-muted-foreground">
              오늘도 성장하는 하루를 만들어보세요.
            </p>
          </div>
          <Button className="bg-rose-500 hover:bg-rose-600 text-white">
            <Sparkles className="mr-2 h-4 w-4" />
            오늘의 미션 시작하기
          </Button>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full md:col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>오늘의 미션</CardTitle>
              <CardDescription>완료한 미션: 0/0</CardDescription>
            </div>
            <Link href="/missions">
              <Button variant="ghost" size="sm" className="gap-1">
                모두 보기
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <DailyMissions />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>오늘의 감정</CardTitle>
            <CardDescription>지금 기분이 어떠신가요?</CardDescription>
          </CardHeader>
          <CardContent>
            <EmotionCheck />
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>성장 그래프</CardTitle>
              <CardDescription>지난 30일간의 성장 추이</CardDescription>
            </div>
            <Tabs defaultValue="missions">
              <TabsList>
                <TabsTrigger value="missions">미션</TabsTrigger>
                <TabsTrigger value="emotions">감정</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <GrowthGraph />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
