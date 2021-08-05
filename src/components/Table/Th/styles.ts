import styled from 'styled-components'

const Style = styled.th`
  padding: 0px;

  button {
    border: solid red 1px;

    color: ${({ theme }) => theme.colors.secondary};
    height: 100%;
  }
`

export default Style

Style.displayName = 'Th-Style'
