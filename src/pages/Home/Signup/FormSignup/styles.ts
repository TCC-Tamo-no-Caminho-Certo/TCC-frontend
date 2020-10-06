import styled from 'styled-components'

import fromTheme from 'utils/fromTheme'

import ReCAPTCHA from 'react-google-recaptcha'

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

    > span {
      font-size: calc(1.3rem + 0.5vh);
      margin: 1.25vh 0;
    }

    > * {
      width: 100%;
      max-width: 530px;
    }
  }

  .InputText,
  .Button,
  .InputDate {
    min-height: 35px;
    height: 5vh;
    font-size: calc(1.3rem + 0.5vh);
  }
`

export const DualInput = styled.div`
  div:first-child {
    border-radius: 10px 10px 0 0;
  }

  div + div {
    border-radius: 0 0 10px 10px;
  }
`

export const Recaptcha = styled(ReCAPTCHA)`
  display: none;
`

export default Style
