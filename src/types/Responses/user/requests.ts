import { RoleType } from './roles'

export interface Request {
  role: RoleType
  feedback: string
  status: 'rejected' | 'awaiting' | 'accepted'
}
