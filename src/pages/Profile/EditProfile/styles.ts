import styled from 'styled-components'

import fromTheme from 'utils/fromTheme'

const Style = styled.div`
  position: absolute;
  left: 72px;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: calc(100vw - 72px);
  height: 100vh;

  background-color: green;
  color: ${fromTheme('white')};
`

export default Style
