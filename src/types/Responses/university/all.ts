import { SeasonType } from './seasons'
import { IntegrantResType } from './integrants'
import { UniversityResType } from './index'

export interface UniversityAllResType extends UniversityResType {
  seasons?: SeasonType[]
  intregants?: IntegrantResType[]
}
