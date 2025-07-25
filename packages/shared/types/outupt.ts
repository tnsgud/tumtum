import { CoreError } from '../errors'

export type SuccessOutput<D> = {
  ok: true
  data: D
  error: undefined
}

export type FailedOutput<E extends CoreError> = {
  ok: false
  data: undefined
  error: E
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type CoreOutput<D = any, E extends CoreError = any> =
  | SuccessOutput<D>
  | FailedOutput<E>

export function createSuccessOutput<D>(data: D): SuccessOutput<D> {
  return {
    ok: true,
    data,
    error: undefined,
  }
}

export function createFailedOutput<E extends CoreError>(
  error: E,
): FailedOutput<E> {
  return {
    ok: false,
    data: undefined,
    error,
  }
}
