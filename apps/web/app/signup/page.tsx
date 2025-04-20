import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SignupForm } from '@/components/signup-form'
import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">회원가입</CardTitle>
          <CardDescription>
            텀텀과 함께 성장하는 개발자가 되어보세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <div className="text-sm text-center text-muted-foreground">
            이미 계정이 있으신가요?{' '}
            <Link
              href="/login"
              className="text-rose-500 hover:text-rose-600 font-medium"
            >
              로그인
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
