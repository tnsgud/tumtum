import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'

export function LandingFooter() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-rose-500 dark:text-rose-400">
              텀텀
            </span>
            <span className="text-sm font-medium">TumTum</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
            >
              이용약관
            </Link>
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
            >
              개인정보처리방침
            </Link>
            <Link
              href="#"
              className="text-xs hover:underline underline-offset-4"
            >
              문의하기
            </Link>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </footer>
  )
}
