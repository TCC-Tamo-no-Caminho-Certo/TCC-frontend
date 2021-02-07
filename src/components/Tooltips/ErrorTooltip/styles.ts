import 'semantic-ui-css/semantic.min.css'
import { Popup } from 'semantic-ui-react'
import styled from 'styled-components'

export const Trigger = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;

  .Icon {
    min-width: 24px;

    fill: ${({ theme }) => theme.colors.red};
  }
`

const Style = styled(Popup)`
  font-size: 1.3rem !important;
  border-radius: 10px !important;

  border: none !important;
  color: white !important;

  &,
  &:before {
    margin-left: 1px !important;

    box-shadow: none !important;
    background-color: ${({ theme }) => theme.colors.primary} !important;
  }
`

export default Style

Trigger.displayName = 'Trigger-Style'
Style.displayName = 'ErrorTooltip-Style'
