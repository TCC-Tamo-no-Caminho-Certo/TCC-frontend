import { Response } from '../'

export interface PeriodsType {
  confirm: number
  dispatch: number
  evaluate: number
  in_progress: number
}

export interface SeasonType {
  title: string
  edict: string
  begin: string
  description: string
  periods: PeriodsType
  status: 'pre-release' | 'released' | 'canceled' | 'archived'
  current_period: 'confirm' | 'dispatch' | 'evaluate' | 'in_progress'
}

export type SeasonsType = SeasonType[]

export interface SeasonsResType extends Response {
  seasons: SeasonsType
}
