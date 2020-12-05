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
    background-color: #d65881 !important;
    box-shadow: none !important;
    margin-left: 1px !important;
  }
`

StyledTooltipError.displayName = 'TooltipError-Style'
