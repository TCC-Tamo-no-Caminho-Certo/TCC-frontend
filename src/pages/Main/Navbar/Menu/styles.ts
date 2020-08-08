import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

const Style = styled.div`
  color: ${fromTheme('primary')};
  background-color: ${fromTheme('tertiary')};
  border-radius: 0 0 50% 0;

  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transform: translate(-10%, -10%);
    height: 60px;
    width: 60px;
  }
`

export default Style
