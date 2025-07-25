// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export class CoreError<T = any> extends Error {
  code: T

  constructor(code: T) {
    super()
    this.code = code
  }
}
