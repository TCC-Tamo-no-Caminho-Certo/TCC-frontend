import styled from 'styled-components'

export const Begin = styled.div``

const Style = styled.div`
  padding: 16px;

  .Form .List {
    border: solid 1px ${({ theme }) => theme.colors.tertiary};
  }

  .Form .List .Content {
    padding: 8px;

    > li {
      width: 100%;

      & + li {
        margin-top: 8px;
      }

      .Submit {
        width: 100%;
      }
    }
  }
`

export default Style

Begin.displayName = 'Begin-Style'
Style.displayName = 'CreateSeason-Style'
