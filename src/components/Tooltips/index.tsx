import React from 'react'
import { StyledTooltipError } from './styles'
import { PopupProps } from 'semantic-ui-react'
import { FcHighPriority } from 'react-icons/fc'

export const ErrorTooltip: React.FC<PopupProps> = ({ ...rest }) => {
  return (
    <StyledTooltipError
      trigger={<FcHighPriority size={23} />}
      position='top left'
      {...rest}
    />
  )
}
