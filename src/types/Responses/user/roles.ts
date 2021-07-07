export interface ProfessorResType {
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

export interface StudentResType {
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
