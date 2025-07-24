import { Mission } from '@tumtum/db'
import { MissionError } from '../../errors'
import { CoreOutput } from '../outupt'

export type FindAllMissionsOutuput = CoreOutput<Mission[], MissionError>
