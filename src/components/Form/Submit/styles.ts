import { lighten } from 'polished'
import styled from 'styled-components'

const Style = styled.button`
  position: relative;

  height: 44px;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};

  &:disabled {
    background-color: ${({ theme }) => lighten(0.1, theme.colors.primary)};
  }

  .DotsLoader {
    position: absolute;
    right: 10%;
    top: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default Style

Style.displayName = 'Submit-Style'
