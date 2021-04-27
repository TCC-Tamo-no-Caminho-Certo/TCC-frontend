import styled from 'styled-components'

const Style = styled.button`
  display: flex;
  align-items: center;

  transition: all 0.2s;

  color: ${({ theme }) => theme.colors.tertiary};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 24px;
    height: 24px;
  }
`

export default Style

Style.displayName = 'BackButton-Style'
