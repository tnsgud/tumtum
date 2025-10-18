'use client'

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select'
import { Badge } from '../ui/badge'
import { X } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useOnboardingStore } from '@/stores/onboarding-store'
import { Label } from '../ui/label'
import { LaterButton } from './later-button'

type SelectInput = {
  name: 'job' | 'experience'
  label: string
  placeholder: string
  selectItem: { [key in string]: string }
}
const selectInput: SelectInput[] = [
  {
    name: 'job',
    label: '직업',
    placeholder: '직업을 선택하세요',
    selectItem: {
      frontend: '프론트엔드 개발자',
      backend: '백엔드 개발자',
      fullstack: '풀스택 개발자',
      mobile: '모바일 개발자',
      devops: 'DevOps 엔지니어',
      designer: '디자이너',
      pm: '프로덕트 매니저',
      student: '학생',
      other: '기타',
    },
  },
  {
    name: 'experience',
    label: '경력',
    placeholder: '경력을 선택하세요',
    selectItem: {
      '0': '신입',
      '1': '1년 미만',
      '1-3': '1-3년',
      '3-5': '3-5년',
      '5+': '5년 이상',
    },
  },
]

export function ProfileTab() {
  const regexp = new RegExp(/^.*[0-9].*$/)
  const {
    job,
    experience,
    interests,
    setJob,
    setExperience,
    setInterests,
    onNextTab,
  } = useOnboardingStore()

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return

    const interest = e.currentTarget.value.trim()
    if (interest !== '') {
      e.preventDefault()

      if (!interests.includes(interest)) {
        setInterests([...interests, interest])
      }

      e.currentTarget.value = ''
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setInterests(interests.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="flex flex-col space-y-4 pt-4">
      {selectInput.map(({ name, label, placeholder, selectItem }) => (
        <div key={`profile-item-${name}`} className="flex flex-col space-y-2">
          <Label>{label}</Label>
          <Select
            defaultValue={name === 'experience' ? experience : job}
            onValueChange={(v) => {
              regexp.test(v) ? setExperience(v) : setJob(v)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                Object.entries(selectItem).map(([key, value]) => (
                  <SelectItem
                    key={`profile-form-item-${name}-${key}`}
                    value={key}
                  >
                    {value}
                  </SelectItem>
                )),
              )}
            </SelectContent>
          </Select>
        </div>
      ))}

      <div>
        <Label>관심 분야</Label>
        <div className="flex flex-wrap gap-2 my-1">
          {interests.map((interest) => (
            <Badge
              key={interest}
              className="bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
            >
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
          onKeyDown={handleAddTag}
        />
      </div>

      <div className="flex justify-between">
        <LaterButton />
        <Button
          onClick={onNextTab}
          className="bg-rose-500 hover:bg-rose-600 text-white"
        >
          다음
        </Button>
      </div>
    </div>
  )
}
