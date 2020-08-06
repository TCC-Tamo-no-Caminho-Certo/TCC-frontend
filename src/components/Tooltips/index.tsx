import React from 'react'
import { StyledTooltipError } from './styles'
import { PopupProps } from 'semantic-ui-react'
import { FcHighPriority } from 'react-icons/fc'

export const ErrorTooltip: React.FC<PopupProps> = ({ className, ...rest }) => {
  return (
    <StyledTooltipError
      trigger={<FcHighPriority size={22} className={className} />}
      position='top left'
      {...rest}
    />
  )
}
