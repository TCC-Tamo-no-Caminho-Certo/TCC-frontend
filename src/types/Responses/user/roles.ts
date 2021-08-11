import { Response } from '../'

export type RoleType =
  | 'guest'
  | 'student'
  | 'professor'
  | 'customer'
  | 'evaluator'
  | 'moderator'
  | 'developer'
  | 'administrator'

export type RolesType = RoleType[]

export interface RolesResType extends Response {
  roles: RolesType
}
