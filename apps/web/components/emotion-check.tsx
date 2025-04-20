"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type Emotion = {
  id: string
  emoji: string
  name: string
  color: string
}

export function EmotionCheck() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const [note, setNote] = useState("")

  const emotions: Emotion[] = [
    { id: "excited", emoji: "😄", name: "신남", color: "bg-amber-100 dark:bg-amber-950" },
    { id: "happy", emoji: "🙂", name: "행복", color: "bg-emerald-100 dark:bg-emerald-950" },
    { id: "neutral", emoji: "😐", name: "보통", color: "bg-slate-100 dark:bg-slate-900" },
    { id: "tired", emoji: "😩", name: "피곤", color: "bg-purple-100 dark:bg-purple-950" },
    { id: "sad", emoji: "😢", name: "슬픔", color: "bg-blue-100 dark:bg-blue-950" },
    { id: "stressed", emoji: "😠", name: "스트레스", color: "bg-rose-100 dark:bg-rose-950" },
  ]

  const handleSubmit = () => {
    console.log({ emotion: selectedEmotion, note })
    // 여기에 감정 기록 저장 로직 추가
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {emotions.map((emotion) => (
          <Button
            key={emotion.id}
            variant="outline"
            className={cn(
              "flex h-auto flex-col gap-1 p-3",
              selectedEmotion === emotion.id && "border-2 border-rose-500 dark:border-rose-400",
              emotion.color,
            )}
            onClick={() => setSelectedEmotion(emotion.id)}
          >
            <span className="text-2xl">{emotion.emoji}</span>
            <span className="text-xs font-normal">{emotion.name}</span>
          </Button>
        ))}
      </div>

      <Textarea
        placeholder="오늘 기분이 어떤지 간단히 적어보세요..."
        className="h-20 resize-none"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <Button
        className="w-full bg-rose-500 hover:bg-rose-600 text-white"
        disabled={!selectedEmotion}
        onClick={handleSubmit}
      >
        감정 기록하기
      </Button>
    </div>
  )
}
