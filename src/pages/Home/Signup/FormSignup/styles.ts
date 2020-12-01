// import fromTheme from 'utils/fromTheme'

import styled from 'styled-components'

const Style = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  min-width: 320px;
  width: 100vw;
  height: 100vh;
  padding: 73px 0 73px 0;
  box-shadow: 8px 0px 6px 0px rgba(0, 0, 0, 0.34);

  background-color: #fcfcfc;

  nav {
    position: absolute;
    top: 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    max-width: 1000px;
    height: 4vh;

    .ThemeSwitch {
      min-width: 33px;
      min-height: 33px;
      height: 100%;
    }
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    width: 80%;

    & > button {
      width: 100%;
      height: 5vh;
      min-height: 35px;
      transition: all 0.2s;
      font: 700 1.8rem 'Archivo';
      font-size: calc(1.3rem + 0.5vh);

      color: white;
      border: none;
      margin-top: 30px;
      border-radius: 8px;
      background-color: #ec5878;

      &:hover {
        filter: brightness(1.1);
        transform: scale(1.01);
      }

      position: relative;

      .DotsLoader {
        position: absolute;
        right: 10%;
        top: 50%;

        transform: translateY(-50%);
      }
    }

    .dual {
      border-radius: 10px 10px 0 0;

      & + div {
        border-top: 1px solid transparent;
        border-radius: 0 0 10px 10px;
      }
    }

    & > span {
      font-size: calc(1.3rem + 0.5vh);
      margin: 1.25vh 0;
    }

    & > * {
      width: 100%;
      max-width: 530px;
    }
  }

  .Logo {
    margin-bottom: 22px;
  }

  @media screen and (min-width: 1000px) {
    border-radius: 0 20px 20px 0;
    width: 38vw;

    nav {
      width: 80%;
    }
  }
`

export default Style

Style.displayName = 'FormSignup-Style'
