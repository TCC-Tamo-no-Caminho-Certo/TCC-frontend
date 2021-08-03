import { Response } from '../index'
import {
  ModeratorDataType,
  ProfessorDataType,
  StudentDataType
} from '../user/requests'
import { RoleType } from '../user/roles'

import { StatusTypes } from 'utils/status'

export interface RequestType {
  id: number
  role: RoleType
  user_id: number
  updated_at: string
  created_at: string
  status: StatusTypes
  data: ProfessorDataType & StudentDataType & ModeratorDataType
  feedback?: string
}

type RequestsType = RequestType[]

export interface RequestsResType extends Response {
  requests: RequestsType
}
