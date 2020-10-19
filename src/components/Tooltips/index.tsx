import React from 'react'
import { StyledTooltipError } from './styles'

import { RootState, useSelector } from 'store'
import { ThemeState } from 'store/theme'

import { FcHighPriority } from 'react-icons/fc'
import { PopupProps } from 'semantic-ui-react'

export const ErrorTooltip: React.FC<PopupProps> = ({ className = 'errorIcon', ...rest }) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  return (
    <StyledTooltipError
      theme={theme}
      trigger={<FcHighPriority className={className} />}
      className='ErrorTooltip'
      position='top left'
      {...rest}
    />
  )
}
