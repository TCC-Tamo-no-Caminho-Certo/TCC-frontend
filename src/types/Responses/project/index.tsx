import { Response } from '../'

export type StatusType =
  | 'sketch'
  | 'refused'
  | 'accepted'
  | 'completed'
  | 'in_progress'

export interface ProjectType {
  id: number
  title: string
  resume: string
  status: StatusType
  university_id: number
}

type ProjectsType = ProjectType[]

export interface ProjectResType extends Response {
  project: ProjectType
}

export interface ProjectsResType extends Response {
  projects: ProjectsType
}
