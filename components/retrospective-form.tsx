import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'

type Emotion = {
  id: string
  emoji: string
  name: string
  color: string
}

export function RetrospectiveForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const emotions: Emotion[] = [
    {
      id: 'excited',
      emoji: '😄',
      name: '신남',
      color: 'bg-amber-100 dark:bg-amber-950',
    },
    {
      id: 'happy',
      emoji: '🙂',
      name: '행복',
      color: 'bg-emerald-100 dark:bg-emerald-950',
    },
    {
      id: 'neutral',
      emoji: '😐',
      name: '보통',
      color: 'bg-slate-100 dark:bg-slate-900',
    },
    {
      id: 'tired',
      emoji: '😩',
      name: '피곤',
      color: 'bg-purple-100 dark:bg-purple-950',
    },
    {
      id: 'sad',
      emoji: '😢',
      name: '슬픔',
      color: 'bg-blue-100 dark:bg-blue-950',
    },
    {
      id: 'stressed',
      emoji: '😠',
      name: '스트레스',
      color: 'bg-rose-100 dark:bg-rose-950',
    },
  ]

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ title, content, emotion: selectedEmotion, tags })
    // 여기에 회고 저장 로직 추가
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          placeholder="회고 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>오늘의 감정</Label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {emotions.map((emotion) => (
            <Button
              key={emotion.id}
              type="button"
              variant="outline"
              className={cn(
                'flex h-auto flex-col gap-1 p-3',
                selectedEmotion === emotion.id &&
                  'border-2 border-rose-500 dark:border-rose-400',
                emotion.color,
              )}
              onClick={() => setSelectedEmotion(emotion.id)}
            >
              <span className="text-2xl">{emotion.emoji}</span>
              <span className="text-xs font-normal">{emotion.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">내용</Label>
        <Textarea
          id="content"
          placeholder="오늘 하루를 돌아보고 배운 점, 느낀 점을 자유롭게 작성해보세요."
          className="min-h-[200px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">태그</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              className="bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
            >
              {tag}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 p-0"
                onClick={() => handleRemoveTag(tag)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">태그 삭제</span>
              </Button>
            </Badge>
          ))}
        </div>
        <Input
          id="tags"
          placeholder="태그를 입력하고 Enter를 누르세요"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline">
          취소
        </Button>
        <Button
          type="submit"
          className="bg-rose-500 hover:bg-rose-600 text-white"
        >
          저장하기
        </Button>
      </div>
    </form>
  )
}
