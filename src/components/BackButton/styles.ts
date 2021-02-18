import styled from 'styled-components'

const Style = styled.button`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.tertiary};
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    width: 24px;
    height: 24px;
  }
`

export default Style
