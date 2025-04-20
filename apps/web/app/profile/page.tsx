import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ProfileInfo } from '@/components/profile-info'
import { EmotionStats } from '@/components/emotion-stats'
import { AchievementStats } from '@/components/achievement-stats'

export default function ProfilePage() {
  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">마이페이지</h1>
        <p className="text-muted-foreground">나의 성장 여정을 확인해보세요.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ProfileInfo />

        <Card>
          <CardHeader>
            <CardTitle>달성률</CardTitle>
            <CardDescription>지난 30일간의 미션 달성률</CardDescription>
          </CardHeader>
          <CardContent>
            <AchievementStats />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>감정 기록 통계</CardTitle>
          <CardDescription>지난 30일간의 감정 변화</CardDescription>
        </CardHeader>
        <CardContent>
          <EmotionStats />
        </CardContent>
      </Card>
    </div>
  )
}
