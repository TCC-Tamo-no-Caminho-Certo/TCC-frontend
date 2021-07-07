import { SeasonResType } from './seasons'
import { IntegrantResType } from './integrants'
import { UniversityResType } from './index'

export interface UniversityAllResType extends UniversityResType {
  seasons?: SeasonResType[]
  intregants?: IntegrantResType[]
}
