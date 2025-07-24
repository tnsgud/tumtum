'use client'

import { customFetch } from '@/lib/custom-fetch'
import { MouseEventHandler } from 'react'

export default function TestComp() {
  const onClick = async () => {
    const response = await customFetch('/users/all', {
      credentials: 'include',
    })
    console.log(response)
  }

  return (
    <button type="submit" onClick={onClick}>
      click me
    </button>
  )
}
