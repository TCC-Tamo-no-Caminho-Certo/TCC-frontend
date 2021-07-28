import { Response } from '../index'

export interface UserUniversityType {
  id: number
  name: string
}

export type UserUniversitiesType = UserUniversityType[]

export interface UserUniversitiesResType extends Response {
  universities: UserUniversitiesType
}
