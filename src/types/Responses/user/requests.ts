import { RoleType } from './roles'

export interface Request {
  status: 'rejected' | 'awaiting' | 'accepted'
  role: RoleType // está retornando role_id
}
