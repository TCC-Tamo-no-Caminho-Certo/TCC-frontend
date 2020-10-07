import { ThemeState } from 'store/Theme'

const fromTheme = (attribute: keyof ThemeState) => (props: any): string => props.theme[attribute]

export default fromTheme
