import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Trophy } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ProfileInfo() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16 border-4 border-rose-100 dark:border-rose-900">
          <AvatarImage src="/placeholder.svg?height=64&width=64" alt="프로필 이미지" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-xl">김개발</CardTitle>
          <CardDescription>주니어 프론트엔드 개발자</CardDescription>
        </div>
        <Button variant="outline" size="icon">
          <Edit className="h-4 w-4" />
          <span className="sr-only">프로필 수정</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center rounded-lg border p-3">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Calendar className="h-4 w-4" />
              <span>연속 기록</span>
            </div>
            <p className="text-2xl font-bold text-rose-500 dark:text-rose-400">7일</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border p-3">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Trophy className="h-4 w-4" />
              <span>총 미션</span>
            </div>
            <p className="text-2xl font-bold text-rose-500 dark:text-rose-400">42개</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">관심 분야</h3>
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="bg-rose-50 dark:bg-rose-950/30">
              React
            </Badge>
            <Badge variant="outline" className="bg-rose-50 dark:bg-rose-950/30">
              Next.js
            </Badge>
            <Badge variant="outline" className="bg-rose-50 dark:bg-rose-950/30">
              TypeScript
            </Badge>
            <Badge variant="outline" className="bg-rose-50 dark:bg-rose-950/30">
              UI/UX
            </Badge>
            <Badge variant="outline" className="bg-rose-50 dark:bg-rose-950/30">
              성능 최적화
            </Badge>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">목표</h3>
          <p className="text-sm text-muted-foreground">
            1년 안에 미들레벨 개발자로 성장하고, 오픈소스 프로젝트에 기여하기
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
