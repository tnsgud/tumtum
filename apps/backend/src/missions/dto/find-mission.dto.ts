import { Mission, IFindMissionOutput, MissionError } from '@tumtum/shared'

export class FindMissionOutput implements IFindMissionOutput {
  ok: boolean
  data: Mission[]
  error: MissionError | undefined

  constructor() {
    this.ok = false
    this.data = []
    this.error = undefined
  }
}
