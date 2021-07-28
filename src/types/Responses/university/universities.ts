import { Response } from '../'
import { UniversityType } from './'

export type UniversitiesType = UniversityType[]

export interface UniversitiesResType extends Response {
  universities: UniversitiesType
}
