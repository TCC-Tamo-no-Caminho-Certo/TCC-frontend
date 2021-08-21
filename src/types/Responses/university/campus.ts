import { Response } from '../'

export type OneCampusType = {
  id: number
  name: string
  university_id: number
}

export type CampusType = OneCampusType[]

export interface CampusResType extends Response {
  campus: CampusType
}

export interface OneCampusResType extends Response {
  campus: OneCampusType
}
