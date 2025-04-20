"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export function OnboardingForm() {
  const [activeTab, setActiveTab] = useState("profile")
  const [tagInput, setTagInput] = useState("")
  const [interests, setInterests] = useState<string[]>([])

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault()
      if (!interests.includes(tagInput.trim())) {
        setInterests([...interests, tagInput.trim()])
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setInterests(interests.filter((tag) => tag !== tagToRemove))
  }

  const handleNextTab = () => {
    if (activeTab === "profile") {
      setActiveTab("goals")
    } else if (activeTab === "goals") {
      setActiveTab("routines")
    } else if (activeTab === "routines") {
      // 온보딩 완료 처리
      console.log("온보딩 완료")
    }
  }

  const handlePrevTab = () => {
    if (activeTab === "goals") {
      setActiveTab("profile")
    } else if (activeTab === "routines") {
      setActiveTab("goals")
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">프로필</TabsTrigger>
        <TabsTrigger value="goals">목표</TabsTrigger>
        <TabsTrigger value="routines">루틴</TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="nickname">닉네임</Label>
          <Input id="nickname" placeholder="텀텀에서 사용할 닉네임을 입력하세요" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="job">직업</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="직업을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frontend">프론트엔드 개발자</SelectItem>
              <SelectItem value="backend">백엔드 개발자</SelectItem>
              <SelectItem value="fullstack">풀스택 개발자</SelectItem>
              <SelectItem value="mobile">모바일 개발자</SelectItem>
              <SelectItem value="devops">DevOps 엔지니어</SelectItem>
              <SelectItem value="designer">디자이너</SelectItem>
              <SelectItem value="pm">프로덕트 매니저</SelectItem>
              <SelectItem value="student">학생</SelectItem>
              <SelectItem value="other">기타</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">경력</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="경력을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">신입</SelectItem>
              <SelectItem value="1">1년 미만</SelectItem>
              <SelectItem value="1-3">1-3년</SelectItem>
              <SelectItem value="3-5">3-5년</SelectItem>
              <SelectItem value="5+">5년 이상</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>관심 분야</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {interests.map((interest) => (
              <Badge key={interest} className="bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                {interest}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 p-0"
                  onClick={() => handleRemoveTag(interest)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">태그 삭제</span>
                </Button>
              </Badge>
            ))}
          </div>
          <Input
            placeholder="관심 분야를 입력하고 Enter를 누르세요 (예: React, TypeScript)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleNextTab} className="bg-rose-500 hover:bg-rose-600 text-white">
            다음
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="goals" className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="shortTermGoal">단기 목표 (3개월)</Label>
          <Textarea
            id="shortTermGoal"
            placeholder="3개월 내에 달성하고 싶은 목표를 작성해주세요."
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="longTermGoal">장기 목표 (1년)</Label>
          <Textarea
            id="longTermGoal"
            placeholder="1년 내에 달성하고 싶은 목표를 작성해주세요."
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label>목표 달성을 위해 필요한 것</Label>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="skill" />
              <label
                htmlFor="skill"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                기술 습득
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="project" />
              <label
                htmlFor="project"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                프로젝트 경험
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="network" />
              <label
                htmlFor="network"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                네트워킹
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="mentoring" />
              <label
                htmlFor="mentoring"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                멘토링
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="study" />
              <label
                htmlFor="study"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                스터디
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="certificate" />
              <label
                htmlFor="certificate"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                자격증
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button onClick={handlePrevTab} variant="outline">
            이전
          </Button>
          <Button onClick={handleNextTab} className="bg-rose-500 hover:bg-rose-600 text-white">
            다음
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="routines" className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label>일일 루틴 설정</Label>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="routine1" />
                <label htmlFor="routine1" className="text-sm font-medium leading-none">
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
                <label htmlFor="routine2" className="text-sm font-medium leading-none">
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
                <label htmlFor="routine3" className="text-sm font-medium leading-none">
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
          <Button className="bg-rose-500 hover:bg-rose-600 text-white">완료</Button>
        </div>
      </TabsContent>
    </Tabs>
  )
}
