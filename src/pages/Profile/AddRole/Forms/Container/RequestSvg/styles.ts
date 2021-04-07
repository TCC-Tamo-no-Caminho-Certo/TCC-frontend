import { StatusTypes } from 'utils/status'

import styled from 'styled-components'

interface StyleProps {
  status: StatusTypes
}

const Style = styled.div<StyleProps>`
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    text-align: center;

    color: ${({ theme }) => theme.colors.tertiary};

    li {
      width: 100px;
      font-size: clamp(1.6rem, 0.6rem + 2.6vw, 1.7rem);
    }
  }

  svg {
    width: 100%;

    path.checkIcon {
      fill: ${({ theme }) => theme.colors.secondary};
    }

    path.errorIcon {
      stroke-width: 3;

      stroke: ${({ theme }) => theme.colors.secondary};
    }

    stop#true {
      stop-color: ${({ theme }) => theme.colors.primary};
    }

    stop#false {
      stop-color: ${({ theme, status }) =>
        status === 'rejected' ? theme.colors.red : theme.colors.tertiary};
    }
  }

  @media screen and (min-width: 545px) {
    svg {
      padding: 0px 16px;
    }
  }
`

export default Style

Style.displayName = 'RequestSvg-Style'
