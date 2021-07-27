import { Response } from '../'

export type Role =
  | 'guest'
  | 'admin'
  | 'student'
  | 'professor'
  | 'customer'
  | 'evaluator'
  | 'moderator'

export interface RolesResType extends Response {
  roles: Role[]
}

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
  universities: {
    id: number
    register: string
    course_id: number
    campus_id: number
    semester: boolean
  }[]
  lattes?: string
  linkedin?: string
}

export interface AdministratorType {
  university_id: number
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
