import GenericMeetingPhase from './GenericMeetingPhase'
import shortid from 'shortid'
import {MeetingTypeEnum} from 'parabol-client/types/graphql'

interface Input {
  teamId: string
  meetingType: MeetingType
  meetingCount: number
  name?: string
  phases: GenericMeetingPhase[]
  facilitatorUserId: string
  showConversionModal?: boolean
}

const namePrefix = {
  [MeetingTypeEnum.action]: 'Action meeting',
  [MeetingTypeEnum.retrospective]: 'Retro'
}
export type MeetingType = 'action' | 'retrospective'
export default class Meeting {
  id = shortid.generate()
  createdAt = new Date()
  updatedAt = new Date()
  defaultFacilitatorUserId: string
  endedAt: Date | undefined = undefined
  facilitatorStageId: string
  facilitatorUserId: string
  isAsync: undefined
  meetingCount: number
  meetingNumber: number
  name: string
  summarySentAt: Date | undefined = undefined
  teamId: string
  meetingType: MeetingType
  phases: GenericMeetingPhase[]
  showConversionModal?: boolean

  constructor(input: Input) {
    const {
      teamId,
      facilitatorUserId,
      meetingCount,
      meetingType,
      name,
      phases,
      showConversionModal
    } = input
    this.defaultFacilitatorUserId = facilitatorUserId
    this.facilitatorStageId = phases[0].stages[0].id
    this.facilitatorUserId = facilitatorUserId
    this.meetingCount = meetingCount
    this.meetingNumber = meetingCount + 1
    this.meetingType = meetingType
    this.name = name ?? `${namePrefix[meetingType]} #${this.meetingNumber}`
    this.phases = phases
    this.teamId = teamId
    this.showConversionModal = showConversionModal
  }
}
