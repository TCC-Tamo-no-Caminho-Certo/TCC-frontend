import fromTheme from 'utils/fromTheme'

import 'semantic-ui-css/semantic.min.css'
import { Popup } from 'semantic-ui-react'
import styled from 'styled-components'

export const StyledTooltipError = styled(Popup)`
  font-size: 1.3rem !important;
  border-radius: 10px !important;
  border: none !important;
  color: white !important;

  &,
  &:before {
    background-color: ${fromTheme('primary')} !important;
  }

  &:before {
    box-shadow: none !important;
    margin-left: 5% !important;
  }
`

StyledTooltipError.displayName = 'TooltipError-Style'
