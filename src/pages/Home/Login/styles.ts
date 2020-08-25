import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

import ReCAPTCHA from 'react-google-recaptcha'

const Style = styled.section`
  grid-area: login;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 320px;
  width: calc(100% + 1px);
  padding-top: 73px;

  background-color: ${fromTheme('secondary')};

  header {
    position: absolute;
    top: 20px;

    width: 80%;
    max-width: 1000px;
    height: 33px;

    .ThemeSwitch {
      position: absolute;
      right: 0;
    }
  }
`

export const Register = styled.div`
  text-align: center;

  padding: 10px 0;

  color: ${fromTheme('tertiary')};

  &,
  button {
    font-size: calc(1.2rem + 0.5vh);
  }

  button {
    border: none;
    background-color: transparent;

    color: ${fromTheme('primary')};
  }
`

export const Content = styled.div`
  width: calc(100% - 1px);
  height: 100%;

  &,
  & > *,
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  & > * {
    width: 80%;
    max-width: 450px;
    margin-bottom: 2.5vh;

    &:last-child {
      margin: 0;
    }
  }

  form {
    > * {
      width: 100%;
      margin-bottom: 2.5vh;

      &:last-child {
        margin: 0;
      }
    }
  }

  a {
    font-size: calc(1.5rem + 0.2vh);

    color: ${fromTheme('primary')};
  }

  label {
    flex-direction: row;

    font-size: calc(1.5rem + 0.2vh);
    line-height: 40px;

    cursor: pointer;
    border-bottom: 2px solid ${fromTheme('tertiary')};

    input {
      margin-right: 8px;
    }
  }

  a {
    margin-bottom: 5px;
    font-size: calc(1.2rem + 0.5vh);
  }

  .InputText,
  .Button,
  label {
    min-height: 35px;
    height: 5vh;
    font-size: calc(1.3rem + 0.5vh);
  }

  @media screen and (min-height: 700px) {
    form {
      margin-top: 0;
    }
  }
`

export const Google = styled.button.attrs({ type: 'button' })`
  flex-direction: row;

  width: auto;
  padding: 10px 5px;

  color: ${fromTheme('tertiary')};
  border-bottom: solid 2px ${fromTheme('tertiary')};
  cursor: pointer;

  span {
    font-size: calc(1.2rem + 0.5vh);
  }

  img {
    width: 25px;
    margin-right: 10px;
  }
`

export const Recaptcha = styled(ReCAPTCHA)`
  display: none;
`

export default Style
