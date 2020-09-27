import styled from 'styled-components'

import fromTheme from 'utils/fromTheme'

import { Popup } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

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
