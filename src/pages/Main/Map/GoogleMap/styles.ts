import styled from 'styled-components'

const Style = styled.div`
  max-width: 100%;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.secondary};
`

export default Style

Style.displayName = 'GoogleMap-Style'
