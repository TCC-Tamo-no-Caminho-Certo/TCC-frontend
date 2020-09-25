import { useSelector } from 'react-redux'
import { RootState, ThemeState } from 'store'

const fromTheme = (attribute: keyof ThemeState) => (props: any): string => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  return theme[attribute]
}

export default fromTheme
