export interface RegexType {
  email: {
    student: string
    professor: string
  }
  register: {
    student: string
    professor: string
  }
}

export interface UniversityResType {
  id: number
  name: string
  regex: RegexType
}
