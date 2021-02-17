import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

  background-color: ${({theme}) => theme.colors.tertiary};
  color: white;
`
export default Style

Style.displayName = 'Historic-Style'
