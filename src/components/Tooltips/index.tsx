import React from 'react'
import { StyledTooltipError } from './styles'

import { ThemeState } from 'store/Theme'
import { useSelector, RootState } from 'store'

import { PopupProps } from 'semantic-ui-react'
import { FcHighPriority } from 'react-icons/fc'

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
