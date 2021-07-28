import { RoleType } from 'types/Responses/user/roles'

type StatusType = 'accepted' | 'refused' | 'awaiting'

export interface ParticipantType {
  id: number
  name: string
  role: RoleType
  status: StatusType
  tasks: { task: string; title: string }[]
}

export type ParticipantsResType = ParticipantType[]
