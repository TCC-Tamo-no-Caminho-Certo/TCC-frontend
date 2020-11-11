import fromTheme from 'utils/fromTheme'

import styled from 'styled-components'

export const Register = styled.div`
  text-align: center;

  padding: 0 10px;

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
    & > * {
      width: 100%;
      margin-bottom: 2.5vh;

      &:last-child {
        margin: 0;
      }
    }

    button {
      position: relative;

      width: 100%;
      height: 5vh;
      min-height: 35px;
      transition: all 0.2s;
      font-size: calc(1.3rem + 0.5vh);
      font: 700 1.8rem 'Archivo';

      color: white;
      border: none;
      border-radius: 8px;
      background-color: ${fromTheme('primary')};

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

  a {
    margin-bottom: 5px;
    font-size: calc(1.2rem + 0.5vh);

    color: ${fromTheme('primary')};
  }

  #loginFailed {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    min-height: 35px;
    height: 4.5vh;
    font-size: calc(1.3rem + 0.5vh);
    border-radius: 35px;

    color: red;

    .Icon {
      width: 24px;
      fill: red;

      margin-right: 8px;
    }
  }

  #Padlock {
    width: 16px;
  }

  @media screen and (min-height: 700px) {
    form {
      margin-top: 0;
    }
  }
`

export const Permanence = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  height: 40px;

  border-bottom: 2px solid ${fromTheme('quinary')};

  label {
    margin-left: 8px;
    font-size: calc(1.5rem + 0.2vh);
  }
`

export const Google = styled.button.attrs({ type: 'button' })`
  flex-direction: row;

  width: auto;
  padding: 10px 5px;

  cursor: pointer;
  color: ${fromTheme('tertiary')};
  border-bottom: solid 2px ${fromTheme('quinary')};

  span {
    font-size: calc(1.2rem + 0.5vh);
  }

  img {
    width: 25px;
    margin-right: 10px;
  }
`

const Style = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 320px;
  width: 100vw;
  height: 100vh;
  padding: 73px 0px;

  background-color: ${fromTheme('secondary')};

  header {
    position: absolute;
    top: 20px;

    width: 70%;
    max-width: 1000px;
    height: 33px;

    .ThemeSwitch {
      position: absolute;
      right: 0;
    }
  }

  @media screen and (min-width: 1000px) {
    width: calc(38vw + 1px);
  }
`

export default Style

Register.displayName = 'Register-Style'
Content.displayName = 'Content-Style'
Permanence.displayName = 'Permanence-Style'
Google.displayName = 'Google-Style'
Style.displayName = 'FormLogin-Style'
