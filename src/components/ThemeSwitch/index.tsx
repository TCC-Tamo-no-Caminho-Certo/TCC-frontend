import React, { useContext } from 'react'
import Style from './styles'

import { useTheme } from 'hooks/useTheme'

import { ThemeContext } from 'styled-components'

const ThemeSwitch: React.FC = () => {
  const { themeState, setThemeState } = useTheme()
  const themes = useContext(ThemeContext)

  return (
    <Style
      width='39'
      height='51'
      viewBox='0 0 50 63'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='ThemeSwitch'
      onClick={() => setThemeState(!themeState)}
    >
      <path
        stroke={themes.tertiary}
        strokeWidth='4'
        d='M13 48.75V44.5M29.5322 41.9082l-3.0175-3.0175M36.375 25.375h-4.25M29.5322 8.84187l-3.0175 3.01753M13 6.25V2'
      />

      <g stroke={themes.tertiary} strokeWidth='3'>
        <path
          fill={themeState ? themes.primary : themes.secondary}
          d='M23.625 24.625C23.625 18.25 19.375 14 13 14v21.25c6.375 0 10.625-4.25 10.625-10.625z'
        />
        <path
          fill={themeState ? themes.secondary : themes.primary}
          d='M2 24.625C2 31 6.25 35.25 12.625 35.25V14C6.25 14 2 18.25 2 24.625z'
        />
      </g>
    </Style>
  )
}

export default ThemeSwitch
