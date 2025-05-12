export async function customFetcn<T>(
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
    headers: {
      ...defaultHeaders,
      ...(options?.headers || {}),
    },
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => {})
    return errorBody
  }

  return res.json() as Promise<T>
}
