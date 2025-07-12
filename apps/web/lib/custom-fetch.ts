import { ICoreOutput } from '@tumtum/shared'

export async function customFetch<T extends ICoreOutput>(
  input: RequestInfo,
  options?: RequestInit,
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''
  const url = input.toString().startsWith('http') ? input : baseUrl + input

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  }

  const res = await fetch(url, {
    ...options,
    referrerPolicy: 'no-referrer',
    headers: {
      ...defaultHeaders,
      ...(options?.headers || {}),
    },
  })

  if (!res.ok) {
    const body = await res.json()

    return {
      ok: false,
      data: undefined,
      error: body,
    } as T
  }

  return res.json() as Promise<T>
}
