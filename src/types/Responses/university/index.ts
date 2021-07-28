import { Response } from '../index'

export interface RegexType {
  email: { student: string; professor: string }
  register: { student: string; professor: string }
}

export interface UniversityType {
  id: number
  name: string
  regex: RegexType
}

export interface UniversityResType extends Response {
  university: UniversityType
}
