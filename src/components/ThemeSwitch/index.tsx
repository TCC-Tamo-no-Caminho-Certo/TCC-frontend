import React, { useContext } from 'react'

import { ThemeActions, ThemeState } from 'store/Sync/theme'
import { RootState } from 'store'

import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'

const ThemeSwitch = () => {
  const { theme: selectedTheme } = useSelector<RootState, ThemeState>(
    ({ theme }) => theme
  )
  const theme = useContext(ThemeContext)

  const dispatch = useDispatch()

  return (
    <svg
      viewBox='0 0 42 42'
      className='ThemeSwitch'
      xmlns='http://www.w3.org/2000/svg'
      onClick={() =>
        dispatch(
          ThemeActions.changeTheme({
            theme: selectedTheme === 'light' ? 'dark' : 'light'
          })
        )
      }
      style={{ cursor: 'pointer' }}
    >
      <g
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
        stroke={theme.colors.tertiary}
      >
        <path d='M21 40.25L21 36.75' />
        <path d='M21 5.25L21 1.75' />
        <path d='M34.6152 34.6152L32.1302 32.1302' />
        <path d='M40.25 21L36.75 21' />
        <path d='M34.6152 7.38512L32.1302 9.87012' />

        <path
          fill={theme.name === 'light' ? theme.colors.primary : 'none'}
          d='M29.75 21C29.75 15.75 26.25 12.25 21 12.25L21 29.75C26.25 29.75 29.75 26.25 29.75 21Z'
        />
        <path
          fill={theme.name === 'light' ? 'none' : theme.colors.primary}
          d='M12.25 21C12.25 26.25 15.75 29.75 21 29.75L21 12.25C15.75 12.25 12.25 15.75 12.25 21Z'
        />
      </g>
    </svg>
  )
}

export default ThemeSwitch
