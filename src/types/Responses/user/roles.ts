export type Role =
  | 'guest'
  | 'admin'
  | 'student'
  | 'professor'
  | 'customer'
  | 'evaluator'
  | 'moderator'

export interface ProfessorType {
  postgraduate: boolean
  orcid?: string
  lattes?: string
  linkedin?: string
  universities: {
    id: number
    register: string
    course_id: number
    campus_id: number
    full_time: boolean
  }[]
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
  university_id: number
}

export interface ModeratorType {
  universities: { id: number }[]
}

export interface RolesType {
  student?: StudentType
  professor?: ProfessorType
  moderator?: ModeratorType
  administrator?: AdministratorType
}
