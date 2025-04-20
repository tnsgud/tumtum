import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RetrospectiveList } from "@/components/retrospective-list"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function RetrospectivesPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">회고</h1>
          <p className="text-muted-foreground">하루를 돌아보고 성장을 기록해보세요.</p>
        </div>
        <Link href="/retrospectives/new">
          <Button className="bg-rose-500 hover:bg-rose-600 text-white">
            <Plus className="mr-2 h-4 w-4" />새 회고 작성
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>회고 목록</CardTitle>
          <CardDescription>최근 작성한 회고 목록입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <RetrospectiveList />
        </CardContent>
      </Card>
    </div>
  )
}
