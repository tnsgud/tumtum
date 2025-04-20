"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Code, BookOpen, Coffee, Brain, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type Mission = {
  id: string
  title: string
  completed: boolean
  category: "coding" | "learning" | "break" | "thinking"
  timeEstimate: number
  dueDate: string
  priority: "high" | "medium" | "low"
}

type MissionListProps = {
  filter: "all" | "today" | "upcoming" | "completed"
}

export function MissionList({ filter }: MissionListProps) {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: "1",
      title: "React 컴포넌트 리팩토링하기",
      completed: true,
      category: "coding",
      timeEstimate: 60,
      dueDate: "2025-04-20",
      priority: "high",
    },
    {
      id: "2",
      title: "Next.js 문서 읽기",
      completed: true,
      category: "learning",
      timeEstimate: 30,
      dueDate: "2025-04-20",
      priority: "medium",
    },
    {
      id: "3",
      title: "휴식 시간 가지기",
      completed: false,
      category: "break",
      timeEstimate: 15,
      dueDate: "2025-04-20",
      priority: "low",
    },
    {
      id: "4",
      title: "알고리즘 문제 풀기",
      completed: false,
      category: "thinking",
      timeEstimate: 45,
      dueDate: "2025-04-21",
      priority: "medium",
    },
    {
      id: "5",
      title: "API 연동 작업하기",
      completed: false,
      category: "coding",
      timeEstimate: 90,
      dueDate: "2025-04-22",
      priority: "high",
    },
    {
      id: "6",
      title: "TypeScript 타입 정의 개선하기",
      completed: false,
      category: "coding",
      timeEstimate: 60,
      dueDate: "2025-04-23",
      priority: "medium",
    },
  ])

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

  const getPriorityColor = (priority: Mission["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
      case "medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
      case "low":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
    }
  }

  // 필터링된 미션 목록
  const filteredMissions = missions.filter((mission) => {
    const today = new Date().toISOString().split("T")[0]

    switch (filter) {
      case "today":
        return mission.dueDate === today
      case "upcoming":
        return mission.dueDate > today && !mission.completed
      case "completed":
        return mission.completed
      default:
        return true
    }
  })

  return (
    <div className="space-y-4">
      {filteredMissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">미션이 없습니다.</p>
        </div>
      ) : (
        filteredMissions.map((mission) => (
          <div
            key={mission.id}
            className={cn(
              "flex items-start space-x-3 rounded-lg border p-4 transition-colors",
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
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <p className={cn("font-medium", mission.completed && "text-muted-foreground line-through")}>
                  {mission.title}
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">메뉴 열기</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>수정</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>삭제</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <Badge variant="outline" className={cn("flex items-center gap-1", getCategoryColor(mission.category))}>
                  {getCategoryIcon(mission.category)}
                  <span>{mission.category}</span>
                </Badge>
                <Badge variant="outline" className={cn("flex items-center gap-1", getPriorityColor(mission.priority))}>
                  <span>{mission.priority} 우선순위</span>
                </Badge>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>{mission.timeEstimate}분</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  <span>{mission.dueDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
