import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function LandingTestimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-rose-100 px-3 py-1 text-sm text-rose-700 dark:bg-rose-950/50 dark:text-rose-300">
              사용자 후기
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              텀텀과 함께 성장한 개발자들
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              텀텀을 통해 성장한 주니어 개발자들의 이야기를 들어보세요.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 pt-8">
          <Card className="border-rose-100 dark:border-rose-900/50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <Avatar className="h-16 w-16 border-2 border-rose-100 dark:border-rose-900">
                  <AvatarImage
                    src="/placeholder.svg?height=64&width=64"
                    alt="사용자 이미지"
                  />
                  <AvatarFallback>JK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-medium">김주니어</p>
                  <p className="text-sm text-muted-foreground">
                    프론트엔드 개발자
                  </p>
                </div>
                <p className="text-muted-foreground">
                  "텀텀을 통해 매일 작은 미션을 달성하면서 성취감을 느꼈고,
                  3개월 만에 원하던 회사에 취업할 수 있었습니다. 특히 감정 체크
                  기능이 번아웃을 예방하는 데 큰 도움이 되었어요."
                </p>
              </div>
            </CardContent>
            <CardFooter className="justify-center border-t border-rose-50 dark:border-rose-950/50 pt-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={`user-star-1-${
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      i
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 fill-rose-400 text-rose-400"
                  >
                    <title>sadf</title>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </CardFooter>
          </Card>
          <Card className="border-rose-100 dark:border-rose-900/50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <Avatar className="h-16 w-16 border-2 border-rose-100 dark:border-rose-900">
                  <AvatarImage
                    src="/placeholder.svg?height=64&width=64"
                    alt="사용자 이미지"
                  />
                  <AvatarFallback>PD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-medium">박개발</p>
                  <p className="text-sm text-muted-foreground">백엔드 개발자</p>
                </div>
                <p className="text-muted-foreground">
                  "회고 작성 기능이 정말 좋아요. 매일 배운 것을 정리하면서
                  지식이 더 단단해지는 느낌이에요. 6개월 동안 꾸준히 사용하면서
                  실력이 눈에 띄게 향상되었습니다."
                </p>
              </div>
            </CardContent>
            <CardFooter className="justify-center border-t border-rose-50 dark:border-rose-950/50 pt-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={`user-star-2-${
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      i
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 fill-rose-400 text-rose-400"
                  >
                    <title>sadf</title>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </CardFooter>
          </Card>
          <Card className="border-rose-100 dark:border-rose-900/50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <Avatar className="h-16 w-16 border-2 border-rose-100 dark:border-rose-900">
                  <AvatarImage
                    src="/placeholder.svg?height=64&width=64"
                    alt="사용자 이미지"
                  />
                  <AvatarFallback>LM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-medium">이멘토</p>
                  <p className="text-sm text-muted-foreground">시니어 개발자</p>
                </div>
                <p className="text-muted-foreground">
                  "제가 멘토링하는 주니어 개발자들에게 텀텀을 추천하고 있어요.
                  성장 그래프를 통해 진행 상황을 함께 확인하면서 더 효과적인
                  피드백을 줄 수 있게 되었습니다."
                </p>
              </div>
            </CardContent>
            <CardFooter className="justify-center border-t border-rose-50 dark:border-rose-950/50 pt-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={`user-star-2-${
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      i
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 fill-rose-400 text-rose-400"
                  >
                    <title>sadf</title>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
