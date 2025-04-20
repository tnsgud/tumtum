import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RetrospectiveForm } from "@/components/retrospective-form"

export default function NewRetrospectivePage() {
  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">새 회고 작성</h1>
        <p className="text-muted-foreground">오늘 하루를 돌아보고 성장을 기록해보세요.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>회고 작성</CardTitle>
          <CardDescription>오늘의 경험과 배운 점을 기록해보세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <RetrospectiveForm />
        </CardContent>
      </Card>
    </div>
  )
}
