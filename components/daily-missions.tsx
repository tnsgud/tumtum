'use client';

import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Clock, Code, BookOpen, Coffee, Brain } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { Tables } from '@/database.types';

export function DailyMissions() {
  const supabase = createClient();
  const [missions, setMissions] = useState<Tables<'mission'>[]>([]);

  useEffect(() => {
    const fetchMissions = async () => {
      const { data } = await supabase.from('mission').select('*');
      setMissions(data ?? []);
    };
    fetchMissions();
  }, []);
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <div className='flex justify-between text-sm'>
          <span>진행률: 0%</span>
          <span>0/0 완료</span>
        </div>
        <Progress value={0} className='h-2' />
      </div>

      <div className='space-y-3'>
        {missions.map((mission) => (
          <div
            key={mission.id}
            className={cn(
              'flex items-start space-x-3 rounded-lg border p-3 transition-colors',
              mission.is_completed
                ? 'border-muted bg-muted/50'
                : 'border-border hover:border-rose-200 hover:bg-rose-50 dark:hover:border-rose-800 dark:hover:bg-rose-950/30'
            )}
          >
            <Checkbox
              checked={mission.is_completed}
              // onCheckedChange={() => toggleMission(mission.id)}
              className={cn(
                mission.is_completed
                  ? 'border-rose-500 bg-rose-500 text-primary-foreground'
                  : 'border-muted-foreground'
              )}
            />
            <div className='flex-1 space-y-1'>
              <div className='flex items-center justify-between'>
                <p
                  className={cn(
                    'font-medium',
                    mission.is_completed && 'text-muted-foreground line-through'
                  )}
                >
                  {mission.title}
                </p>
                <Badge
                  variant='outline'
                  className={cn(
                    'flex items-center gap-1'
                    // getCategoryColor(mission.category),
                  )}
                >
                  {/* {getCategoryIcon(mission.category_id)} */}
                  <span className='text-xs'>{mission.category_id}</span>
                </Badge>
              </div>
              <div className='flex items-center text-xs text-muted-foreground'>
                <Clock className='mr-1 h-3 w-3' />
                <span>{mission.elapsed_time}분</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
