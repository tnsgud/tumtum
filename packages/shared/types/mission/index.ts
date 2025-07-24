export interface Mission {
  id: string
  title: string
  description: string | null
  category: string
  isCompleted: boolean
  dueDate: Date | null
}
