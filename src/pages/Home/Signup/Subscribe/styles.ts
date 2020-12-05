import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 320px;
  width: 100vw;
  height: 100vh;

  color: #fcfcfc;
  background-color: transparent;

  @media screen and (min-width: 1200px) {
    width: 62vw;
  }
`

export default Style

Style.displayName = 'Subscribe-Style'
