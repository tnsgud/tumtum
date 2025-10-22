'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { browserClient } from '@/lib/supabase.browser';
import { useRouter } from 'next/navigation';
import { Tables } from '@/supabase';

type Emotion = Pick<Tables<'emotion'>, 'id' | 'name' | 'emoji' | 'default_color' | 'dark_mode_color'>

export function RetrospectiveForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<number | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [emotions, setEmotions] = useState<Emotion[]>([]);

  useEffect(() => {
    async function fetchData() {
      const supabase = browserClient();
      const { data } = await supabase.from('emotion').select('id, name, emoji, default_color, dark_mode_color');
      
      setEmotions(data ?? [])
    }

    fetchData();
  }, [])

  // const emotions: Emotion[] = [
  //   {
  //     id: 'excited',
  //     emoji: '😄',
  //     name: '신남',
  //     color: 'bg-amber-100 dark:bg-amber-950',
  //   },
  //   {
  //     id: 'happy',
  //     emoji: '🙂',
  //     name: '행복',
  //     color: 'bg-emerald-100 dark:bg-emerald-950',
  //   },
  //   {
  //     id: 'neutral',
  //     emoji: '😐',
  //     name: '보통',
  //     color: 'bg-slate-100 dark:bg-slate-900',
  //   },
  //   {
  //     id: 'tired',
  //     emoji: '😩',
  //     name: '피곤',
  //     color: 'bg-purple-100 dark:bg-purple-950',
  //   },
  //   {
  //     id: 'sad',
  //     emoji: '😢',
  //     name: '슬픔',
  //     color: 'bg-blue-100 dark:bg-blue-950',
  //   },
  //   {
  //     id: 'stressed',
  //     emoji: '😠',
  //     name: '스트레스',
  //     color: 'bg-rose-100 dark:bg-rose-950',
  //   },
  // ];

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEmotion) return;

    // 여기에 회고 저장 로직 추가
    const supabase = browserClient();
    const { error } = await supabase.from('retrospectives').insert({
      title,
      content,
      summary,
      tags: tags.join(','),
      emotion_id: selectedEmotion,
    })

    if (error) {
      alert(`문제가 발생했습니다. 관리자한테 문의하세요\n${error}`)
      return;
    }

    alert('회고가 등록되었습니다.')
    router.push('/retrospectives')
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='title'>제목</Label>
        <Input
          id='title'
          placeholder='회고 제목을 입력하세요'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y">
        <Label>한줄 요약</Label>
        <Input id="summray"
          placeholder='회고의 한줄 요약을 입력하세요.'
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
      </div>

      <div className='space-y-2'>
        <Label>오늘의 감정</Label>
        <div className='grid grid-cols-3 sm:grid-cols-6 gap-2'>
          {emotions.map((emotion) => (
            <Button
              key={emotion.id}
              type='button'
              variant='outline'
              className={cn(
                `flex h-auto flex-col gap-1 p-3 border-2 ${emotion.default_color} dark:${emotion.dark_mode_color}`,
                selectedEmotion === emotion.id ?
                  `border-rose-500 dark:border-rose-400` : 'border-transparent',
              )}
              onClick={() => setSelectedEmotion(emotion.id)}
            >
              <span className='text-2xl'>{emotion.emoji}</span>
              <span className='text-xs font-normal'>{emotion.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='content'>내용</Label>
        <Textarea
          id='content'
          placeholder='오늘 하루를 돌아보고 배운 점, 느낀 점을 자유롭게 작성해보세요.'
          className='min-h-[200px]'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='tags'>태그</Label>
        <div className='flex flex-wrap gap-2 mb-2'>
          {tags.map((tag) => (
            <Badge
              key={tag}
              className='bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
            >
              {tag}
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='h-4 w-4 ml-1 p-0'
                onClick={() => handleRemoveTag(tag)}
              >
                <X className='h-3 w-3' />
                <span className='sr-only'>태그 삭제</span>
              </Button>
            </Badge>
          ))}
        </div>
        <Input
          id='tags'
          placeholder='태그를 입력하고 Enter를 누르세요'
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
        />
      </div>

      <div className='flex justify-end gap-2'>
        <Button type='button' variant='outline'>
          취소
        </Button>
        <Button
          type='submit'
          className='bg-rose-500 hover:bg-rose-600 text-white'
        >
          저장하기
        </Button>
      </div>
    </form>
  );
}
