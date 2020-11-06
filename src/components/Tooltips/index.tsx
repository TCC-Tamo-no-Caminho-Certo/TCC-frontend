import React, { memo } from 'react'
import { StyledTooltipError } from './styles'

import AlertIcon from 'assets/Inputs/AlertIcon'

import { PopupProps } from 'semantic-ui-react'

interface Props extends PopupProps {
  theme: any
}

const ErrorTooltip: React.FC<Props> = ({ theme, ...rest }) => {
  return (
    <StyledTooltipError
      theme={theme}
      trigger={
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AlertIcon />
        </div>
      }
      className='ErrorTooltip'
      position='top left'
      {...rest}
    />
  )
}

export default memo(ErrorTooltip)
