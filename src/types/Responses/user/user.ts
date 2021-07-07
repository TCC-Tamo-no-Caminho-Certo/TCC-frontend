import { Role } from 'store/Async/roles'

export interface UserResType {
  id: number
  name: string
  roles: Role[]
  phone: string
  surname: string
  birthday: string
  full_name: string
  updated_at: string
  avatar_uuid: string
  created_at: string
}
