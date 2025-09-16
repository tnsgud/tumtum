'use client';

import { useEffect, useState } from 'react';
import { Tables } from '@/database.types';
import { createClient } from '@/utils/supabase/client';
import { MissionListItem } from './mission-list-item';
import { getDateString } from '@/lib/date-utils';

type MissionListProps = {
  filter: 'all' | 'today' | 'upcoming' | 'completed';
};

function isToday(dateString: string): boolean {
  const today = getDateString(new Date());
  return dateString === today;
}

function isFuture(dateString: string): boolean {
  const today = getDateString(new Date());
  return dateString > today;
}

// 'id, title, deadline_at, is_completed, priority, category(color, name)'
export type Mission = Pick<
  Tables<'mission'>,
  'id' | 'title' | 'deadline_at' | 'is_completed' | 'priority'
> & { category: Pick<Tables<'category'>, 'color' | 'name'> };

export function MissionList({ filter }: MissionListProps) {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [updatingMissions, setUpdatingMissions] = useState<Set<number>>(
    new Set()
  );

  const toggleMission = async (id: number) => {
    const mission = missions.find((m) => m.id === id);
    if (!mission || updatingMissions.has(id)) return; // 이미 업데이트 중이면 무시

    const newCompletedState = !mission.is_completed;

    // 로딩 상태 추가
    setUpdatingMissions((prev) => new Set(prev).add(id));

    // Optimistic update: UI를 먼저 업데이트
    setMissions(
      missions.map((mission) =>
        mission.id === id
          ? { ...mission, is_completed: newCompletedState }
          : mission
      )
    );

    // Supabase에 실제 업데이트
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('mission')
        .update({
          is_completed: newCompletedState,
          completed_at: newCompletedState ? new Date().toISOString() : null,
        })
        .eq('id', id);

      if (error) {
        // 실패 시 원래 상태로 되돌리기
        setMissions(
          missions.map((mission) =>
            mission.id === id
              ? { ...mission, is_completed: !newCompletedState }
              : mission
          )
        );
        console.error('미션 상태 업데이트 실패:', error);
      }
    } catch (error) {
      // 네트워크 오류 등으로 실패 시 원래 상태로 되돌리기
      setMissions(
        missions.map((mission) =>
          mission.id === id
            ? { ...mission, is_completed: !newCompletedState }
            : mission
        )
      );
      console.error('미션 상태 업데이트 중 오류:', error);
    } finally {
      // 로딩 상태 제거
      setUpdatingMissions((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };
  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();
      const { data } = await supabase
        .from('mission')
        .select(
          'id, title, deadline_at, is_completed, priority, category(color, name)'
        )
        .is('deleted_at', null);
      // .eq('deleted_at', '');

      setMissions(data ?? []);
    }

    fetchData();
  }, []);

  const filteredMissions = missions.filter((mission) => {
    const missionDate = getDateString(mission.deadline_at);

    switch (filter) {
      case 'today':
        return isToday(missionDate);
      case 'upcoming':
        return isFuture(missionDate) && !mission.is_completed;
      case 'completed':
        return mission.is_completed;
      default:
        return true;
    }
  });

  return (
    <div className='space-y-4'>
      {filteredMissions.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          <p className='text-muted-foreground'>미션이 없습니다.</p>
        </div>
      ) : (
        filteredMissions.map((mission) => (
          <MissionListItem
            key={`mission-item-${mission.id}`}
            onCheckedChange={() => toggleMission(mission.id)}
            mission={mission}
            isUpdating={updatingMissions.has(mission.id)}
          />
        ))
      )}
    </div>
  );
}
