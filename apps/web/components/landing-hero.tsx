import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function LandingHero() {
  return (
    <section className="w-full py-12 flex justify-center md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                주니어 개발자를 위한
                <br />
                <span className="text-rose-500 dark:text-rose-400">
                  자기관리형 성장 플랫폼
                </span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                텀텀과 함께 번아웃 없이 지속 가능한 성장을 경험하세요. 하루의
                루틴과 미션을 설정하고, 감정 상태를 기록하며, 회고를 통해
                스스로의 성장을 시각적으로 확인할 수 있습니다.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                  지금 시작하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline">이미 계정이 있어요</Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[450px] lg:w-[450px]">
              <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-100 dark:bg-rose-950/30" />
              <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-200 dark:bg-rose-900/30" />
              <div className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-300 dark:bg-rose-800/30 flex items-center justify-center">
                <span className="text-6xl">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
