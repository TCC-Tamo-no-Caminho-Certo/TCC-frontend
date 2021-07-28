import { RoleType } from './roles'
import { Response } from '../index'

export interface StudentDataType {
  id: number
  lattes: string
  linkedin: string
  register: string
  semester: number
  campus_id: number
  course_id: number
  university_id: number
  voucher_uuid?: string
}

export interface ProfessorDataType {
  id: number
  orcid: string
  lattes: string
  linkedin: string
  register: string
  campus_id: number
  course_id: number
  full_time: boolean
  postgraduate: boolean
  university_id: number
  voucher_uuid?: string
}

export interface ModeratorDataType {
  university_id: number
  pretext: string
}

export interface RequestType<Data> {
  id: number
  data: Data
  role: RoleType
  feedback: string
  created_at: string
  updated_at: string
  status: 'rejected' | 'awaiting' | 'accepted'
}

export interface RequestResType<Data> extends Response {
  request: RequestType<Data>
}

export type RequestsType<Data> = RequestType<Data>[]

export interface RequestsResType extends Response {
  requests: RequestsType<any>[]
}
