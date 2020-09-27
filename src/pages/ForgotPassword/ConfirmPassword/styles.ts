import styled from 'styled-components'

import { Button } from '../styles'

export const PasswordBlock = styled.div`
  width: 90%;

  margin: auto;
`

export const ButtonPassword = styled(Button)`
  margin-top: 20px;

  @media (max-width: 425px) {
    position: static;
  }
`
