// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type CoreOutput<D = any, E = any> = {
  ok: boolean
  data?: D
  error?: E
}

export function createOutput<T extends CoreOutput>(): T {
  return {
    ok: false,
  } as T
}
