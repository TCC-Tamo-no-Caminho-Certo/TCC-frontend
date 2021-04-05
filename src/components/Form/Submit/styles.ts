import { lighten } from 'polished'
import styled from 'styled-components'

const Style = styled.button`
  position: relative;

  height: clamp(35px, 3vh + 2vw, 44px);
  border-radius: 8px;
  transition: all 0.2s;

  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};

  &:disabled {
    background-color: ${({ theme }) => lighten(0.3, theme.colors.primary)};
  }

  &:hover {
    transform: scale(1.01);

    filter: brightness(1.1);
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
