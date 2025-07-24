export class CoreError extends Error {
  code: string

  constructor(code: string) {
    super()
    this.code = code
  }
}
