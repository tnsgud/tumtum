'use client'

import { ChangeEvent, FormEvent } from 'react'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { onboardingStore } from '@/stores/onboarding-store'
import { CheckedState } from '@radix-ui/react-checkbox'

interface Props {
  onPrev: () => void
  onNext: () => void
}

interface Item {
  id: 'shortTermGoal' | 'longTermGoal'
  label: string
  placeholder: string
}

interface CheckBoxItem {
  id: string
  label: string
}

const items: Item[] = [
  {
    id: 'shortTermGoal',
    label: '단기 목표 (3개월)',
    placeholder: '3개월 내에 달성하고 싶은 목표를 작성해주세요.',
  },
  {
    id: 'longTermGoal',
    label: '장기 목표 (1년)',
    placeholder: '1년 내에 달성하고 싶은 목표를 작성해주세요.',
  },
]

const checkboxs: CheckBoxItem[] = [
  { id: 'skill', label: '기술 습득' },
  { id: 'project', label: '프로젝트 경험' },
  { id: 'network', label: '네트워킹' },
  { id: 'mentoring', label: '멘토링' },
  { id: 'study', label: '스터디' },
  { id: 'certificate', label: '자격증' },
]

export function GoalsTab({ onPrev, onNext }: Props) {
  const {
    shortTermGoal,
    longTermGoal,
    requiredForGoal,
    setShortTermGoal,
    setLongTermGoal,
    setRequiredForGoal,
  } = onboardingStore()

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.currentTarget

    if (id === 'shortTermGoal') {
      return setShortTermGoal(value)
    }

    setLongTermGoal(value)
  }

  const handleRequires = (isChecked: CheckedState, id: string) => {
    if (isChecked) {
      return setRequiredForGoal([...requiredForGoal, id])
    }

    setRequiredForGoal([...requiredForGoal.filter((r) => r !== id)])
  }

  return (
    <div className="flex flex-col space-y-4 pt-4">
      {items.map(({ id, label, placeholder }) => (
        <div key={`goals-tab-item-${id}`}>
          <Label htmlFor={id}>{label}</Label>
          <Textarea
            id={id}
            placeholder={placeholder}
            value={id === 'shortTermGoal' ? shortTermGoal : longTermGoal}
            onChange={handleOnChange}
            className="min-h-[100px]"
          />
        </div>
      ))}

      <div className="space-y-2">
        <Label>목표 달성을 위해 필요한 것</Label>
        {requiredForGoal.join(', ')}
        <div className="grid grid-cols-2 gap-2">
          {checkboxs.map(({ id, label }) => (
            <div
              key={`goals-tab-checkbox-${id}`}
              className="flex items-center space-x-2"
            >
              <Checkbox
                id={id}
                onCheckedChange={(e) => handleRequires(e, id)}
              />
              <Label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <Button onClick={onPrev} variant="outline">
          이전
        </Button>
        <Button
          onClick={onNext}
          className="bg-rose-500 hover:bg-rose-600 text-white"
        >
          다음
        </Button>
      </div>
    </div>
  )
}
