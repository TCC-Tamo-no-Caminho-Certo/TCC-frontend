import styled from 'styled-components'

const Style = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  min-height: 100vh;

  color: ${({ theme }) => theme.colors.secondary};

  .Card .Form {
    width: 100%;

    .Submit {
      width: 100%;
      margin-top: 24px;
    }
  }
`

export default Style

Style.displayName = 'ProfileRoles-Style'
