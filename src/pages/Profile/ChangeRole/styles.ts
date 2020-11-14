import fromTheme from 'utils/fromTheme'

import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  padding-top: 64px;
  min-height: 100vh;

  background-color: ${fromTheme('tertiary')};
  color: white;

  h2 {
    font-size: 3.2rem;
    width: 80%;
  }

  p {
    width: 80%;
    font-size: 1.6rem;
  }

  #Roles {
    display: flex;
    flex-flow: row wrap;
    align-content: space-between;
    justify-content: space-around;

    width: 80%;

    .Role {
      margin-top: 48px;
    }

    .Role + .Role {
      margin-left: 48px;
    }
  }
`
export default Style

Style.displayName = 'ChangeRole-Style'
