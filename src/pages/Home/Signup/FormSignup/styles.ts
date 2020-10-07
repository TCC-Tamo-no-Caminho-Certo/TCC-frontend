import styled from 'styled-components'

import fromTheme from 'utils/fromTheme'

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 38vw;
  height: 100vh;
  padding: 73px 0 73px 0;

  background-color: ${fromTheme('secondary')};

  nav {
    position: absolute;
    top: 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 30%;
    max-width: 1000px;
    height: 4vh;

    button {
      display: flex;
      align-items: center;

      height: 100%;

      color: ${fromTheme('primary')};

      svg {
        min-width: calc(33px + 0.8vh);
        min-height: calc(20px + 0.8vh);

        transform: translateX(-40%);
      }

      a {
        font-size: calc(1.3rem + 0.5vh);
        line-height: calc(20px + 0.8vh);
        transform: translateX(-48%);

        &:hover {
          color: ${fromTheme('primary')};
        }
      }
    }

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

    button {
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
      background-color: ${fromTheme('primary')};

      &:hover {
        filter: brightness(1.1);
        transform: scale(1.01);
      }

      position: relative;

      span {
        position: absolute;
        right: 10%;
        top: calc(50% - 9px);
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

    > span {
      font-size: calc(1.3rem + 0.5vh);
      margin: 1.25vh 0;
    }

    > * {
      width: 100%;
      max-width: 530px;
    }
  }
`

export default Style
