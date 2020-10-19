import { ThemeState } from 'store/theme'

interface Props {
  theme: ThemeState
}

function fromTheme(attribute: keyof ThemeState) {
  return (themes: Props): string => themes.theme[attribute]
}

export default fromTheme
