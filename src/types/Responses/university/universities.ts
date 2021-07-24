import { Response } from '../'
import { UniversityResType } from './'

export interface UniversitiesResType extends Response {
  universities: UniversityResType[]
}
