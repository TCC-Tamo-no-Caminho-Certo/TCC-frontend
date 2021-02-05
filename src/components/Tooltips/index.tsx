import React from 'react'
import { ErrorTooltipStyle, ErrorTooltipTriggerArea } from './styles'

import AlertIcon from 'assets/Inputs/AlertIcon'

import { PopupProps } from 'semantic-ui-react'

interface ErrorTooltip extends PopupProps {
  error: boolean
}

export const ErrorTooltip: React.FC<PopupProps> = ({ error, ...props }) => {
  return error ? (
    <ErrorTooltipStyle
      {...props}
      position='top left'
      trigger={
        <ErrorTooltipTriggerArea>
          <AlertIcon />
        </ErrorTooltipTriggerArea>
      }
    />
  ) : (
    <></>
  )
}
