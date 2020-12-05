// import fromTheme from 'utils/fromTheme'

import styled from 'styled-components'

interface PermanenceProps {
  permanence: boolean
}

export const Register = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;

  padding: 0 10px;

  &,
  button {
    font-size: calc(1.2rem + 0.5vh);
  }

  button {
    border: none;
    background-color: transparent;

    color: #ec5878;
  }
`

export const Content = styled.div`
  width: 80%;
  height: 100%;

  &,
  a,
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

    a {
      margin-bottom: 0;
      font-size: calc(1.2rem + 0.5vh);
      text-decoration: underline;
      text-align: end;

      color: #ec5878;

      &:hover {
        filter: brightness(1.1);
        transform: scale(1.01);
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
      background-color: #ec5878;

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

export const Permanence = styled.div<PermanenceProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  height: 40px;

  border-bottom: 2px solid #6e4850;

  label {
    margin-left: 8px;
    font-size: calc(1.5rem + 0.2vh);

    color: ${({ permanence }) => (permanence ? '#EC5878' : '#6E4850')};

    &:hover {
      color: #ec5878;
    }
  }
`

const Style = styled.div`
  position: relative;
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 320px;
  width: 100vw;
  height: 100vh;
  padding: 73px 0px;

  background-color: #fcfcfc;

  header {
    position: absolute;
    top: 20px;

    width: 70%;
    max-width: 1000px;
    height: 33px;

    .ThemeSwitch {
      position: absolute;
      right: 0;

      height: 4vh;
    }
  }

  @media screen and (min-width: 1000px) {
    width: calc(38vw + 1px);
    border-radius: 20px 0 0 20px;
  }
`

export default Style

Register.displayName = 'Register-Style'
Content.displayName = 'Content-Style'
Permanence.displayName = 'Permanence-Style'
Style.displayName = 'FormLogin-Style'
