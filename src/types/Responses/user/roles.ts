import { Response } from '../'

export type RoleType =
  | 'guest'
  | 'admin'
  | 'student'
  | 'professor'
  | 'customer'
  | 'evaluator'
  | 'moderator'

export type RolesType = RoleType[]

export interface RolesResType extends Response {
  roles: RolesType
}
