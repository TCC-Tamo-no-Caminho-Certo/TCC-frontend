import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

const Style = styled.button`
  border-width: 0px;
  border-radius: 5px 0 5px 0;
  transition: transform 0.5s;
  height: 45px;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: ${fromTheme('secondary')};
  background-color: ${fromTheme('primary')};

  &:hover {
    transform: scale(1.06);
  }
`

export default Style
