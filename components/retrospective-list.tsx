'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Tables } from '@/supabase'
import { dateFormat } from '@/lib/date-utils'
import { browserClient } from '@/lib/supabase.browser'

type Retrospective = Pick<Tables<'retrospectives'>, 'id' |'created_at'|'title'|'summary'|'tags'> & { emotionEmoji: string} 

export function RetrospectiveList() {
  // const retrospectives = [
  //   {
  //     id: '1',
  //     date: '2025-04-19',
  //     title: 'React 컴포넌트 구조 개선',
  //     emotion: 'excited',
  //     emotionEmoji: '😄',
  //     summary:
  //       '오늘은 React 컴포넌트 구조를 개선하는 작업을 했습니다. 코드가 훨씬 깔끔해졌고, 재사용성도 높아졌습니다.',
  //     tags: ['React', '리팩토링', '성장'],
  //   },
  //   {
  //     id: '2',
  //     date: '2025-04-18',
  //     title: 'API 연동 중 발생한 문제 해결',
  //     emotion: 'happy',
  //     emotionEmoji: '🙂',
  //     summary:
  //       'API 연동 중 CORS 이슈가 발생했지만, 원인을 찾아 해결했습니다. 문제 해결 과정에서 많은 것을 배웠습니다.',
  //     tags: ['API', '문제해결', 'CORS'],
  //   },
  //   {
  //     id: '3',
  //     date: '2025-04-17',
  //     title: '번아웃 극복하기',
  //     emotion: 'tired',
  //     emotionEmoji: '😩',
  //     summary:
  //       '오늘은 번아웃이 심하게 왔습니다. 무리하지 않고 휴식을 취했고, 내일 다시 시작하기로 했습니다.',
  //     tags: ['번아웃', '휴식', '자기관리'],
  //   },
  // ]
  const [retrospectives, setRetrospectives] = useState<Retrospective[]>([]);

  useEffect(() => {
    async function fetchData() {
      const supabase = browserClient();
      const { data } = await supabase.from('retrospectives').select('id, created_at, emotion(emoji), title, summary, tags');

      if (!data) {
        return setRetrospectives([])
      }

      setRetrospectives(data.map(({id, created_at, emotion: {emoji}, summary, tags, title}) => ({
        id,
        created_at,
        title,
        summary,
        tags,
        emotionEmoji: emoji
      })))
    }

    fetchData();
  }, [])

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {retrospectives.map((retro) => (
        <Card key={retro.id} className="flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {dateFormat(retro.created_at)}
              </span>
              <span className="text-xl">{retro.emotionEmoji}</span>
            </div>
            <CardTitle className="text-lg">{retro.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {retro.summary}
            </p>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-3 pt-0">
            <div className="flex flex-wrap gap-1">
              {retro.tags?.split(',').map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="bg-rose-50 dark:bg-rose-950/30"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <Link href={`/retrospectives/${retro.id}`} className="w-full">
              <Button variant="ghost" className="w-full justify-between">
                자세히 보기
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
