'use client';

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { browserClient } from '@/lib/supabase.browser';
import { Mission } from './types';
import { DailyMissionItem } from './daily-mission-item';

export function DailyMissions() {
  const supabase = browserClient();
  const [missions, setMissions] = useState<Mission[]>([]);

  useEffect(() => {
    const fetchMissions = async () => {
      const day = new Date().toISOString().split('T')[0];

      const { data } = await supabase
        .from('mission')
        .select(
          'id, title, deadline_at, is_completed, priority, category(color, name)'
        )
        .is('deleted_at', null)
        .is('is_completed', false)
        .gte('deadline_at', `${day}T0:00:00Z`)
        .lte('deadline_at', `${day}T23:59:59Z`);

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
        {missions.length === 0 ? (
          <div>등록된 미션이 없습니다.</div>
        ) : (
          missions.map((mission) => (
            <DailyMissionItem
              key={`daily-mission-${mission.id}`}
              mission={mission}
            />
          ))
        )}
      </div>
    </div>
  );
}
