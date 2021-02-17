import styled from 'styled-components'

const Style = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: max(100vw, 320px);
  min-height: 100vh;

  background-color: ${({ theme }) => theme.colors.secondary};

  nav {
    position: absolute;
    top: 24px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: min(80%, 1000px);
    height: 4vh;

    .ThemeSwitch {
      height: max(100%, 33px);
    }
  }

  .Logo {
    padding-top: 80px;
    margin-bottom: 20px;
  }

  form {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: clamp(300px, 80%, 530px);

    & > * {
      width: 100%;
    }

    span {
      margin: 1.25vh 0;
    }

    .dual {
      border-radius: 10px 10px 0 0;

      & + div {
        border-top: 1px solid transparent;
        border-radius: 0 0 10px 10px;
      }
    }

    .Submit {
      height: max(5vh, 35px);

      transition: all 0.2s;
      margin-top: 30px;
      border-radius: 8px;

      &:hover {
        filter: brightness(1.1);
        transform: scale(1.01);
      }

      .DotsLoader {
        position: absolute;
        right: 10%;
        top: 50%;

        transform: translateY(-50%);
      }
    }
  }

  @media screen and (min-width: 1200px) {
    border-radius: 0 20px 20px 0;
    width: 38vw;

    nav {
      width: 80%;
    }
  }
`

export default Style

Style.displayName = 'FormSignup-Style'
