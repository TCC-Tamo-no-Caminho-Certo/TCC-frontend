/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ThemeState } from 'store/theme'

/**
  Recebe a propriedade theme do redux, e retorna uma função que
  acessa a cor, com a chave passada por parâmetro da segunda função.
*/

const fromTheme = (attribute: keyof ThemeState) => (props: any): string => props.theme[attribute]

export default fromTheme
