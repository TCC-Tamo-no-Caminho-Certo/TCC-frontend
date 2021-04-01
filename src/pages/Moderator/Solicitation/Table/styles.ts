import styled from 'styled-components'

const Style = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;

  color: ${({ theme }) => theme.colors.secondary};
`

export default Style

Style.displayName = 'Table-Style'
