import { Response } from '../'

export interface ProfessorType {
  postgraduate: boolean
  universities: {
    id: number
    register: string
    course_id: number
    campus_id: number
    full_time: boolean
  }[]
  orcid?: string
  lattes?: string
  linkedin?: string
}

export interface StudentType {
  lattes?: string
  linkedin?: string
  universities: {
    id: number
    register: string
    course_id: number
    campus_id: number
    semester: boolean
  }[]
}

export interface AdministratorType {
  university: { id: number }
}

export interface ModeratorType {
  universities: { id: number }[]
}

export interface RolesDataType {
  student?: StudentType
  professor?: ProfessorType
  moderator?: ModeratorType
  administrator?: AdministratorType
}

export interface RolesDataResType extends Response {
  roles: RolesDataType
}

export interface AdministratorResType extends Response {
  administrator: AdministratorType
}
