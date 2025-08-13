import { CustomMission } from './index'
import { CoreOutput } from '../outupt'
import { MissionError } from '../../errors'

export type GetAllMissionsOutput = CoreOutput<CustomMission[], MissionError>
