import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  svg {
    height: 130px;

    overflow: visible;

    .cls-1 {
      fill: ${({ theme }) => theme.colors.primary};
    }

    .cls-2 {
      fill: ${({ theme }) => theme.colors.secondary};
    }

    .cls-3,
    .cls-4 {
      fill: ${({ theme }) => theme.colors.tertiary};
    }
  }
`

export default Style

Style.displayName = 'FullLogo-Style'
