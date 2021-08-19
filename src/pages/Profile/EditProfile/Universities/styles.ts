import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100vh;

  .Card .Form {
    width: 100%;

    .Submit {
      width: 100%;
      margin-top: 24px;
    }
  }
`

export default Style

Style.displayName = 'Component-Style'
