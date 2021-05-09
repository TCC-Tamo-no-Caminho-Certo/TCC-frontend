import styled from 'styled-components'

const Style = styled.section`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;

  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.tertiary};

  header {
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    text-align: left;
    align-items: center;

    width: max(100%, 280px);
    padding: 16px 16px 0px 8px;

    h1 {
      font-size: clamp(1.8rem, 0.6rem + 2.6vw, 2.3rem);
    }
  }

  #content {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    width: 100%;

    button {
      max-width: 80%;
      padding: 24px 128px;
      border-radius: 24px;
      font-size: clamp(1.8rem, 0.6rem + 2.6vw, 2.4rem);

      color: ${({ theme }) => theme.colors.secondary};
      background-color: ${({ theme }) => theme.colors.primary};

      & + button {
        margin-top: 24px;
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
