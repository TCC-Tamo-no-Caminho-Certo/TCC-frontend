import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

export const Style = styled.button`
  font-size: 1.1rem;
  width: 258px;
  height: 36px;
  border-width: 0px;
  border-radius: 5px 0 5px 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: ${fromTheme('secondary')};
  background-color: ${fromTheme('primary')};
  transition: transform 0.5s;

  &:hover {
    transform: scale(1.06);
  }
`
