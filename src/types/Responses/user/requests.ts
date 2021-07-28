import { Role } from './roles'

export interface Request {
  status: 'rejected' | 'awaiting' | 'accepted'
  role: Role // está retornando role_id
}
