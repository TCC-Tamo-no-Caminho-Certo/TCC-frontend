export type StatusType =
  | 'sketch'
  | 'refused'
  | 'accepted'
  | 'completed'
  | 'in_progress'

export interface ProjectResType {
  id: number
  title: string
  resume: string
  status: StatusType
  university_id: number
}
