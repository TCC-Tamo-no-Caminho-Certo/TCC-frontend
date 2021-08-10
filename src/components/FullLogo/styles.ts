import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  svg {
    height: 100%;
    overflow: visible;

    .color-1 {
      fill: ${({ theme }) => theme.colors.primary};
    }

    .color-2 {
      fill: ${({ theme }) => theme.colors.secondary};
    }

    .color-3,
    .color-4 {
      fill: ${({ theme }) => theme.colors.tertiary};
    }
  }
`

export default Style

Style.displayName = 'FullLogo-Style'
