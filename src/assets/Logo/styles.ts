import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;

  svg + svg {
    overflow: visible;
    margin-left: 20px;
  }

  #logo {
    height: 80px;
  }

  #word {
    height: 32px;
  }

  @media screen and (min-width: 440px) {
    flex-direction: row;
  }
`

export default Style

Style.displayName = 'Logo-Style'
