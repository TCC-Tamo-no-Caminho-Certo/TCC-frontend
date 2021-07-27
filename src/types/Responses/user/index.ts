import { Response } from '../'

export interface UserType {
  id: number
  name: string
  phone: string
  surname: string
  birthday: string
  full_name: string
  created_at: string
  updated_at: string
  avatar_uuid: string
}

export interface UserResType extends Response {
  user: UserType
}
