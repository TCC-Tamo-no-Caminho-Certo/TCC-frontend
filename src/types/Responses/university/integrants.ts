import { RoleType } from 'types/Responses/user/roles'

export interface IntegrantResType {
  id: string
  name: string
  role: RoleType
  avatar_uuid: string
}
