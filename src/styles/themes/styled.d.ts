import { ThemeAttributes } from './index'

import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeAttributes {}
}
