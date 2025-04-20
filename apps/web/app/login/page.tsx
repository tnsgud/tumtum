import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LoginForm } from '@/components/login-form'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">텀텀</CardTitle>
          <CardDescription>
            주니어 개발자를 위한 자기관리형 성장 플랫폼
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <div className="text-sm text-center text-muted-foreground">
            계정이 없으신가요?{' '}
            <Link
              href="/signup"
              className="text-rose-500 hover:text-rose-600 font-medium"
            >
              회원가입
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
