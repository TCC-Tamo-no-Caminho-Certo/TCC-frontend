import styled from 'styled-components'

const Style = styled.button`
  display: flex;
  align-items: center;

  color: #6e4850;
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
