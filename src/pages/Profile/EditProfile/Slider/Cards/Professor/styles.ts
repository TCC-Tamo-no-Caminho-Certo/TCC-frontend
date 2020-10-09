import styled from 'styled-components'

import { Card } from '../styles'

const Style = styled(Card)`
  > img {
    width: 128px;
    height: 128px;
    border-radius: 50%;
  }

  > *, form .ChangeSetter {
    margin-bottom: 24px;
  }

  box-shadow: 0 0 20px #000;
`

export default Style
