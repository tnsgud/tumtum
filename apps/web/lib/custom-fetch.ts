import { authStore } from '@/stores/auth-store'
import {
  AuthError,
  AuthErrorCode,
  CoreOutput,
  createFailedOutput,
  RefreshOutput,
} from '@tumtum/shared'

export async function customFetch<T extends CoreOutput>(
  input: RequestInfo,
  options?: RequestInit,
): Promise<T> {
  const { token, isLoggedIn, login } = authStore.getState()
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''
  const url = input.toString().startsWith('http') ? input : baseUrl + input

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  }
  const defaultOptions: RequestInit = {
    credentials: 'include',
    referrerPolicy: 'no-referrer',
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options?.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  }

  if (!isLoggedIn) {
    // If the page being called is not a login or sign-up page, it will redirect to the login page.

    return {
      ok: false,
      data: undefined,
      error: undefined,
    } as T
  }

  let res = await fetch(url, defaultOptions)

  // Unauthorized
  if (res.status === 401) {
    const refreshResponse = await fetch('/auth/refresh', defaultOptions)
    const body = (await refreshResponse.json()) as RefreshOutput

    if (!body.ok) {
      return createFailedOutput(
        new AuthError(AuthErrorCode.EMAIL_ALREADY_EXISTS),
      ) as T
    }

    login(body.data)

    res = await fetch(url, defaultOptions)
  }

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
