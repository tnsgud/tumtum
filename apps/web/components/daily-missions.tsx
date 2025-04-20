'use client'

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Clock, Code, BookOpen, Coffee, Brain } from "lucide-react"

type Mission = {
  id: string
  title: string
  completed: boolean
  category: "coding" | "learning" | "break" | "thinking"
  timeEstimate: number
}

export function DailyMissions() {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: "1",
      title: "React 컴포넌트 리팩토링하기",
      completed: true,
      category: "coding",
      timeEstimate: 60,
    },
    {
      id: "2",
      title: "Next.js 문서 읽기",
      completed: true,
      category: "learning",
      timeEstimate: 30,
    },
    {
      id: "3",
      title: "휴식 시간 가지기",
      completed: false,
      category: "break",
      timeEstimate: 15,
    },
    {
      id: "4",
      title: "알고리즘 문제 풀기",
      completed: false,
      category: "thinking",
      timeEstimate: 45,
    },
    {
      id: "5",
      title: "API 연동 작업하기",
      completed: false,
      category: "coding",
      timeEstimate: 90,
    },
  ])

  const completedCount = missions.filter((mission) => mission.completed).length
  const progress = (completedCount / missions.length) * 100

  const toggleMission = (id: string) => {
    setMissions(
      missions.map((mission) => (mission.id === id ? { ...mission, completed: !mission.completed } : mission)),
    )
  }

  const getCategoryIcon = (category: Mission["category"]) => {
    switch (category) {
      case "coding":
        return <Code className="h-4 w-4" />
      case "learning":
        return <BookOpen className="h-4 w-4" />
      case "break":
        return <Coffee className="h-4 w-4" />
      case "thinking":
        return <Brain className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: Mission["category"]) => {
    switch (category) {
      case "coding":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
      case "learning":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
      case "break":
        return "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300"
      case "thinking":
        return "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>진행률: {progress.toFixed(0)}%</span>
          <span>
            {completedCount}/{missions.length} 완료
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-3">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className={cn(
              "flex items-start space-x-3 rounded-lg border p-3 transition-colors",
              mission.completed
                ? "border-muted bg-muted/50"
                : "border-border hover:border-rose-200 hover:bg-rose-50 dark:hover:border-rose-800 dark:hover:bg-rose-950/30",
            )}
          >
            <Checkbox
              checked={mission.completed}
              onCheckedChange={() => toggleMission(mission.id)}
              className={cn(
                mission.completed ? "border-rose-500 bg-rose-500 text-primary-foreground" : "border-muted-foreground",
              )}
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className={cn("font-medium", mission.completed && "text-muted-foreground line-through")}>
                  {mission.title}
                </p>
                <Badge variant="outline" className={cn("flex items-center gap-1", getCategoryColor(mission.category))}>
                  {getCategoryIcon(mission.category)}
                  <span className="text-xs">{mission.category}</span>
                </Badge>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                <span>{mission.timeEstimate}분</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
