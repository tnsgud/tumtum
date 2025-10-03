'use client';

import { useState } from 'react';
import { browserClient } from '@/lib/supabase.browser';
import { MissionListItem } from './mission-list-item';
import { getDateString } from '@/lib/date-utils';
import { Mission } from './types';

type MissionListProps = {
  filter: 'all' | 'today' | 'upcoming' | 'completed' | 'not_completed';
  data: Mission[]
};

function isToday(dateString: string): boolean {
  const today = getDateString(new Date());
  return dateString === today;
}

function isFuture(dateString: string): boolean {
  const today = getDateString(new Date());
  return dateString > today;
}
// async function fecther(): Promise<Mission[]> {
//   const supabase = browserClient();
//   const { data, error } = await supabase
//     .from('mission')
//     .select(
//       'id, title, deadline_at, is_completed, priority, category(color, name)'
//     )
//     .is('deleted_at', null);


//   if (error) {
//     throw error;
//   }

//   return data ?? [];
// }

export function MissionList({ filter, data }: MissionListProps) {
  const [missions, setMissions] = useState(data)
  const [updatingMissions, setUpdatingMissions] = useState<Set<number>>(
    new Set()
  );

  const toggleMission = async (id: number) => {
    const mission = missions?.find((m) => m.id === id);
    if (!mission || updatingMissions.has(id)) return; // 이미 업데이트 중이면 무시

    const newCompletedState = !mission.is_completed;

    // 로딩 상태 추가
    setUpdatingMissions((prev) => new Set(prev).add(id));

    // Optimistic update: UI를 먼저 업데이트
    setMissions(
      missions?.map((mission) =>
        mission.id === id
          ? { ...mission, is_completed: newCompletedState }
          : mission
      )
    );

    // Supabase에 실제 업데이트
    try {
      const supabase = browserClient();
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
          missions?.map((mission) =>
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
        missions?.map((mission) =>
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


  const filteredMissions = missions?.filter((mission) => {
    const missionDate = getDateString(mission.deadline_at);

    switch (filter) {
      case 'today':
        return isToday(missionDate);
      case 'upcoming':
        return isFuture(missionDate) && !mission.is_completed;
      case 'completed':
        return mission.is_completed;
      case 'not_completed':
        return !mission.is_completed
      default:
        return true;
    }
  });

  return (
    <div className='space-y-4'>
      {filteredMissions?.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          <p className='text-muted-foreground'>미션이 없습니다.</p>
        </div>
      ) : (
        filteredMissions?.map((mission) => (
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
