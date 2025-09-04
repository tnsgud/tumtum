'use client'

import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

export function LaterButton() {
  const router = useRouter()
  const handleOnClick = async () => {
/*    const result = await customFetch('/users/completed-onboarding', {
      method: 'GET',
    })

    if (result.ok) {
      router.push('/dashboard')
    }
    console.log(result)
    */
  }

  return (
    <Button variant="outline" onClick={handleOnClick}>
      나중에 하기
    </Button>
  )
}
