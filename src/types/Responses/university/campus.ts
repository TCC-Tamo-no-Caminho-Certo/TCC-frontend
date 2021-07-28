import { Response } from '../'

export type CampusType = {
  id: number
  name: string
  university_id: number
}[]

export interface CampusResType extends Response {
  campus: CampusType
}
