import 'semantic-ui-css/semantic.min.css'
import { Popup } from 'semantic-ui-react'
import styled from 'styled-components'

export const ErrorTooltipTriggerArea = styled.div.attrs({
  className: 'ErrorTooltipTriggerArea',
})`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 24px;

  .Icon {
    transform: translateX(7px);

    min-width: 24px;

    fill: ${({ theme }) => theme.colors.red};
  }
`

export const ErrorTooltipStyle = styled(Popup)`
  font-size: 1.3rem !important;
  border-radius: 10px !important;
  border: none !important;
  color: white !important;

  &,
  &:before {
    background-color: ${({ theme }) => theme.colors.primary} !important;
    box-shadow: none !important;
    margin-left: 1px !important;
  }
`

ErrorTooltipTriggerArea.displayName = 'ErrorTooltipTriggerArea-Style'
ErrorTooltipStyle.displayName = 'ErrroTooltip-Style'
