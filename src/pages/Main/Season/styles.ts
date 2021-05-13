import styled from 'styled-components'

const Style = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100vh;

  header {
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
    width: max(100%, 280px);
  }

  #content {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    width: 100%;
    padding: 24px 0px;

    #notLinked {
      padding: 24px;
      text-align: center;
      border-radius: 8px;

      background-color: ${({ theme }) => theme.colors.primary};
    }
  }

  @media screen and (min-width: 545px) {
    header {
      padding: 32px;
    }
  }
`
export default Style

Style.displayName = 'Season-Style'
