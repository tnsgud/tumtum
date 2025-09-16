'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 로깅
    console.error('애플리케이션 에러:', error);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center'>
      <div className='space-y-4'>
        <h1 className='text-4xl font-bold text-destructive'>
          오류가 발생했습니다
        </h1>
        <p className='text-muted-foreground max-w-md'>
          예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>
        <div className='flex gap-4 justify-center'>
          <Button onClick={reset}>다시 시도</Button>
          <Button
            variant='outline'
            onClick={() => (window.location.href = '/')}
          >
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}
