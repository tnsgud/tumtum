import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  CheckCircle,
  ListTodo,
  LineChart,
  Heart,
  PenLine,
  Calendar,
} from 'lucide-react'

export function LandingFeatures() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-rose-100 px-3 py-1 text-sm text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
              주요 기능
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              텀텀이 제공하는 성장 도구
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              주니어 개발자의 지속 가능한 성장을 위한 다양한 기능을 제공합니다.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-8">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <ListTodo className="h-6 w-6 text-rose-500" />
              <CardTitle className="text-xl">미션 관리</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                하루의 미션을 설정하고 관리하세요. 작은 성취가 모여 큰 성장이
                됩니다.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <Heart className="h-6 w-6 text-rose-500" />
              <CardTitle className="text-xl">감정 체크</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                매일의 감정 상태를 기록하고 패턴을 파악하세요. 번아웃을 예방하는
                첫 걸음입니다.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <PenLine className="h-6 w-6 text-rose-500" />
              <CardTitle className="text-xl">회고 작성</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                하루를 돌아보고 배운 점을 기록하세요. 회고는 성장의 가장 강력한
                도구입니다.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <LineChart className="h-6 w-6 text-rose-500" />
              <CardTitle className="text-xl">성장 그래프</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                미션 달성률과 감정 상태를 시각화하여 자신의 성장을 한눈에
                확인하세요.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <Calendar className="h-6 w-6 text-rose-500" />
              <CardTitle className="text-xl">루틴 설정</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                지속 가능한 성장을 위한 루틴을 설정하고 관리하세요. 꾸준함이
                성장의 비결입니다.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <CheckCircle className="h-6 w-6 text-rose-500" />
              <CardTitle className="text-xl">목표 달성</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                단기 및 장기 목표를 설정하고 달성 과정을 추적하세요. 명확한
                목표가 성장을 가속화합니다.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
