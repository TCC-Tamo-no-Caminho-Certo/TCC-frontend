import React from 'react'
import Style, { Trigger } from './styles'

import AlertIcon from 'assets/Inputs/AlertIcon'

import { PopupProps } from 'semantic-ui-react'

interface ErrorTooltipProps extends PopupProps {
  error: boolean
}

const ErrorTooltip: React.FC<ErrorTooltipProps> = ({ error, ...props }) => {
  return error ? (
    <Style
      position='top left'
      trigger={
        <Trigger className='Trigger'>
          <AlertIcon />
        </Trigger>
      }
      {...props}
    />
  ) : (
    <></>
  )
}

export default ErrorTooltip
