import { Mission, Category } from '@tumtum/db'

type PickedMission = Pick<
  Mission,
  'id' | 'title' | 'completed' | 'due_date' | 'priority_level'
>

type PickedCategory = Pick<Category, 'name'>
type RenamedCategory = {
  [K in keyof PickedCategory as K extends 'name'
    ? 'category_name'
    : K]: PickedCategory[K]
}

export type CustomMission = PickedMission & RenamedCategory
