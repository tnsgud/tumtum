import { z, ZodError } from 'zod'

const EnvSchema = z.object({
  SECRET_KEY: z.string().trim().min(1),
})
type Env = z.infer<typeof EnvSchema>

export function validate(config: Record<string, any>): Env {
  try {
    return EnvSchema.parse(config)
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('환경 변수 유효성 검사 오류:', error.issues)

      throw new Error(
        `환경 변수 유효성 검사 실패: ${error.errors.map((e) => e.message).join(', ')}`,
      )
    }

    throw error
  }
}
