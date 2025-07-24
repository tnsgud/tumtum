import { Mission } from '.'
import { MissionError } from '../../errors'
import { ICoreOutput } from '../output.interface'

export interface IFindMissionOutput extends ICoreOutput {
  data: Mission[]
  error: MissionError | undefined
}
