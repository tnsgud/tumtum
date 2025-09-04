import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { onboardingStore } from '@/stores/onboarding-store'
import { Check, Pencil, Plus, Trash } from 'lucide-react'
import { Input } from '../ui/input'
import { ChangeEvent } from 'react'
import { LaterButton } from './later-button'

const DATE_OF_THE_WEEK = ['일', '월', '화', '수', '목', '금', '토']

export function RoutinesTab() {
  const {
    routines,
    addEmptyRoutine,
    removeRoutine,
    setRoutine,
    findRoutine,
    onPrevTab,
  } = onboardingStore()

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const { routine } = findRoutine(id)

    routine.name = e.currentTarget.value

    setRoutine(routine)
  }

  const handleRenameRoutine = (id: string) => {
    const { routine } = findRoutine(id)

    routine.isEdit = !routine.isEdit

    setRoutine(routine)
  }

  const handleAddDateOfTheWeek = (id: string, value: string[]) => {
    const { routine } = findRoutine(id)

    routine.dateOfTheWeek = value

    setRoutine(routine)
  }

  return (
    <div className="space-y-4 pt-4">
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-4 items-center">
          <Label className="text-lg font-bold">일일 루틴 설정</Label>
          <Button
            className="bg-rose-500 hover:bg-rose-600 text-white"
            variant="ghost"
            size="icon"
            onClick={addEmptyRoutine}
          >
            <Plus />
          </Button>
        </div>
        <div className="flex flex-col space-y-4">
          {routines.map((routine) => (
            <div key={routine.id} className="rounded-lg border p-4">
              <div className="flex justify-between items-center">
                {routine.isEdit ? (
                  <Input
                    className="w-fit"
                    onChange={(e) => handleChangeName(e, routine.id)}
                    value={routine.name}
                  />
                ) : (
                  <Label className=" font-medium leading-none">
                    {routine.name}
                  </Label>
                )}

                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRenameRoutine(routine.id)}
                  >
                    {routine.isEdit ? <Check /> : <Pencil />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRoutine(routine.id)}
                  >
                    <Trash />
                  </Button>
                </div>
              </div>

              <ToggleGroup
                type="multiple"
                variant="outline"
                size="lg"
                value={routine.dateOfTheWeek}
                className={cn('w-full mt-2')}
                onValueChange={(e) => handleAddDateOfTheWeek(routine.id, e)}
              >
                {DATE_OF_THE_WEEK.map((d) => (
                  <ToggleGroupItem key={`routines-tab-${d}`} value={d}>
                    {d}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <LaterButton />
        <div className="flex flex-row gap-3">
          <Button onClick={onPrevTab} variant="outline">
            이전
          </Button>
          <Button
            className="bg-rose-500 hover:bg-rose-600 text-white"
            onClick={() => console.log(routines)}
          >
            완료
          </Button>
        </div>
      </div>
    </div>
  )
}
