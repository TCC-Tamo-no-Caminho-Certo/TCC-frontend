import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 100vh;

  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.tertiary};

  header {
    display: flex;
    text-align: left;
    align-items: center;

    width: max(100%, 280px);
    padding: 16px 16px 0px 8px;
  }

  .Filters {
    .Presence {
      & > * {
        margin-bottom: 0px;
      }

      .Text {
        margin-bottom: 16px;
      }
    }
  }

  @media screen and (min-width: 545px) {
    header {
      padding: 16px 16px 0px 24px;
    }
  }
`
export default Style

Style.displayName = 'List-Style'
