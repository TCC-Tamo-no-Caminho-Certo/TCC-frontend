import React from 'react'
import { StyledTooltipError } from './styles'

import { PopupProps } from 'semantic-ui-react'
import { FcHighPriority } from 'react-icons/fc'

export const ErrorTooltip: React.FC<PopupProps> = ({ className = 'errorIcon', ...rest }) => {
  return (
    <StyledTooltipError
      trigger={<FcHighPriority className={className} />}
      className='ErrorTooltip'
      position='top left'
      {...rest}
    />
  )
}
