import { cn } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Mission } from './types';
import { getDateString } from '@/lib/date-utils';
import { browserClient } from '@/lib/supabase.browser';
import { getTextColorFromBackground } from '@/lib/ui-utils';

interface Props {
  mission: Mission;
  onCheckedChange: () => void;
  isUpdating?: boolean;
}

const priorities = ['low', 'medium', 'high'];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';
    case 'medium':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
    case 'low':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
  }
};

const onDeleteClick = async (id: number) => {
  const supabase = browserClient();
  const result = await supabase
    .from('mission')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);

  console.log(result);
};

function MissionListItem({
  mission,
  onCheckedChange,
  isUpdating = false,
}: Props) {
  return (
    <div
      className={cn(
        'flex items-start space-x-3 rounded-lg border p-4 transition-colors',
        mission.is_completed
          ? 'border-muted bg-muted/50'
          : 'border-border hover:border-rose-200 hover:bg-rose-50 dark:hover:border-rose-800 dark:hover:bg-rose-950/30'
      )}
    >
      <Checkbox
        checked={mission.is_completed}
        onCheckedChange={() => onCheckedChange()}
        disabled={isUpdating}
        className={cn(
          mission.is_completed
            ? 'border-rose-500 bg-rose-500 text-primary-foreground'
            : 'border-muted-foreground',
          isUpdating && 'opacity-50 cursor-not-allowed'
        )}
      />
      <div className='flex-1 space-y-2'>
        <div className='flex items-start justify-between'>
          <p
            className={cn(
              'font-medium',
              mission.is_completed && 'text-muted-foreground line-through'
            )}
          >
            {mission.title}
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon' className='h-8 w-8'>
                <MoreHorizontal className='h-4 w-4' />
                <span className='sr-only'>메뉴 열기</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>
                <Edit className='mr-2 h-4 w-4' />
                <span>수정</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='text-destructive focus:text-destructive'
                onClick={() => onDeleteClick(mission.id)}
              >
                <Trash2 className='mr-2 h-4 w-4' />
                <span>삭제</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex flex-wrap items-center gap-2 text-xs'>
          <Badge
            variant='outline'
            style={{
              ['--bg-color' as any]: mission.category.color,
            }}
            className={cn(
              'flex items-center gap-1 bg-[var(--bg-color)]',
              getTextColorFromBackground(mission.category.color)
            )}
          >
            <span>{mission.category.name}</span>
          </Badge>
          <Badge
            variant='outline'
            className={cn(
              'flex items-center gap-1',
              getPriorityColor(priorities[mission.priority])
            )}
          >
            <span>{priorities[mission.priority]}</span>
          </Badge>
          <div className='flex items-center text-muted-foreground'>
            <Calendar className='mr-1 h-3 w-3' />
            <span>{getDateString(new Date(mission.deadline_at))}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MissionListItem };
