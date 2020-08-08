import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

const Style = styled.div`
  border-radius: 50%;
  background-color: ${fromTheme('primary')};
  width: 75px;
  height: 75px;

  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
`

export default Style
