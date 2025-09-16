import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Clock, Code, BookOpen, Coffee, Brain } from 'lucide-react';
import { Mission } from './types';
import { getTextColorFromBackground } from '@/lib/ui-utils';

interface Props {
  mission: Mission;
}

function DailyMissionItem({ mission }: Props) {
  return (
    <div
      className={cn(
        'flex items-center space-x-3 rounded-lg border p-3 transition-colors',
        mission.is_completed
          ? 'border-muted bg-muted/50'
          : 'border-border hover:border-rose-200 hover:bg-rose-50 dark:hover:border-rose-800 dark:hover:bg-rose-950/30'
      )}
    >
      <div className='flex-shrink-0'>
        <Checkbox
          checked={mission.is_completed}
          onCheckedChange={() => {}}
          className={cn(
            mission.is_completed
              ? 'border-rose-500 bg-rose-500 text-primary-foreground'
              : 'border-muted-foreground'
          )}
        />
      </div>
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
            style={{
              ['--bg-color' as any]: mission.category.color,
            }}
            className={cn('flex items-center gap-1 bg-[var(--bg-color)]')}
          >
            <span
              className={`text-xs ${getTextColorFromBackground(
                mission.category.color
              )}`}
            >
              {mission.category.name}
            </span>
          </Badge>
        </div>
        {/* <div className='flex items-center text-xs text-muted-foreground'>
                <Clock className='mr-1 h-3 w-3' />
                <span>{mission.elapsed_time}분</span>
              </div> */}
      </div>
    </div>
  );
}

export { DailyMissionItem };
