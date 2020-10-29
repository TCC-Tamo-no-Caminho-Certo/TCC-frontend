import React, { memo } from 'react'
import { StyledTooltipError } from './styles'

import { FcHighPriority } from 'react-icons/fc'
import { PopupProps } from 'semantic-ui-react'

interface Props extends PopupProps {
  theme: any
}

const ErrorTooltip: React.FC<Props> = ({ theme, className = 'errorIcon', ...rest }) => {
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

export default memo(ErrorTooltip)
