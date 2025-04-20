import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function LandingCTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-rose-50 dark:bg-rose-950/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              지금 바로 텀텀과 함께 성장하세요
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              번아웃 없이 지속 가능한 성장을 경험하고 싶다면, 지금 바로
              시작하세요.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-rose-500 hover:bg-rose-600 text-white"
              >
                무료로 시작하기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
