import { DefaultTheme } from 'styled-components'

interface Props {
  theme: DefaultTheme
}

const fromTheme = (attribute: keyof DefaultTheme) => (props: Props): string =>
  props.theme[attribute]

export default fromTheme
