import styled from 'styled-components'

import fromTheme from 'utils/fromTheme'

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100vh;

  background-color: ${fromTheme('tertiary')};

  .Card + .Card {
    margin-left: 60px;
  }
`

export default Style
