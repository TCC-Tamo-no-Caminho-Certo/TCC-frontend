import { Role } from 'store/Async/roles'

type StatusType = 'accepted' | 'refused' | 'awaiting'

export interface ParticipantType {
  id: number
  role: Role
  name: string
  status: StatusType
  tasks: {
    task: string
    title: string
  }[]
}

export type ParticipantsResType = ParticipantType[]
