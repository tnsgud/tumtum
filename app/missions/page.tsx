import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { MissionList } from '@/components/mission/mission-list';
import AddTodoDialog from '@/components/mission/add-todo-dialog';
import { createClient } from '@/utils/supabase/server';
import { Search } from 'lucide-react';

export default async function MissionsPage() {
  const supabase = await createClient();
  const { data: missions } = await supabase.from('mission').select('*');

  if (!missions) {
    return <div>등록된 미션이 없습니다.</div>;
  }

  return (
    <div className='p-6 space-y-6'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>미션 관리</h1>
          <p className='text-muted-foreground'>
            나의 성장을 위한 미션을 관리해보세요.
          </p>
        </div>
        <AddTodoDialog />
      </div>

      <Card>
        <CardHeader>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div className='space-y-1'>
              <CardTitle>미션 리스트</CardTitle>
              <CardDescription>
                총 {missions.length}개의 미션이 있습니다.
              </CardDescription>
            </div>
            <div className='relative'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='미션 검색...'
                className='w-full sm:w-[250px] pl-8'
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='all'>
            <TabsList className='mb-4'>
              <TabsTrigger value='all'>전체</TabsTrigger>
              <TabsTrigger value='today'>오늘</TabsTrigger>
              <TabsTrigger value='upcoming'>예정</TabsTrigger>
              <TabsTrigger value='completed'>완료</TabsTrigger>
            </TabsList>
            <TabsContent value='all'>
              <MissionList filter='all' />
            </TabsContent>
            <TabsContent value='today'>
              <MissionList filter='today' />
            </TabsContent>
            <TabsContent value='upcoming'>
              <MissionList filter='upcoming' />
            </TabsContent>
            <TabsContent value='completed'>
              <MissionList filter='completed' />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
