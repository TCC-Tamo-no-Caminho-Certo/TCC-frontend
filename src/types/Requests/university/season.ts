import { PeriodsType } from '../../Responses/university/seasons'

export interface SeasonReqType {
  title: string
  edict: string
  begin: string
  description: string
  periods: PeriodsType
}
