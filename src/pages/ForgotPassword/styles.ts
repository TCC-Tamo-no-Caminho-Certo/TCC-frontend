import styled from 'styled-components'

import fromTheme from 'utils/fromTheme'

import ReCAPTCHA from 'react-google-recaptcha'

const Style = styled.main`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-color: ${fromTheme('secondary')};
`
export const BackButton = styled.button`
  position: absolute;
  top: 3%;
  left: 1%;

  display: flex;
  align-items: center;

  color: ${fromTheme('primary')};
  transition: all 0.2s;

  &:hover {
    color: ${fromTheme('tertiary')};
  }

  @media (max-width: 500px) {
    top: 1%;
    span {
      display: none;
    }
  }
`

export const Container = styled.article`
  width: min(90%, 500px);
  padding: 20px 15px 40px;
  border-radius: 10px;

  box-shadow: 0 0 5px ${fromTheme('tertiary')};
  background: ${fromTheme('secondary')};

  header {
    display: flex;
    justify-content: center;

    padding: 15px 0;
  }

  @media (max-width: 425px) {
    width: 100%;
    height: 100vh;
    padding: 10% 0 0 0;

    box-shadow: none;
  }
`

export const InputBlock = styled.section`
  width: 90%;
  margin: auto;

  h3 {
    font: 500 2rem 'Archivo';
    margin-bottom: 20px;
    text-align: center;
  }

  p {
    margin: 30px 0;
    text-align: center;
    font-style: italic;
  }
`

export const ConfirmToken = styled.section`
  width: 90%;
  margin: auto;

  h3 {
    font: 500 2rem 'Archivo';
    margin-bottom: 20px;
    text-align: center;
  }

  div.resendContainer {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 15px;
  }

  button.resend {
    margin: 15px;

    text-decoration: underline;
    font-weight: bold;
    color: ${fromTheme('primary')};

    &:hover {
      color: ${fromTheme('tertiary')};
    }
  }
`

export const Button = styled.button`
  width: 100%;
  height: 60px;
  transition: all 0.2s;
  font: 700 1.8rem 'Archivo';

  color: white;
  border: none;
  border-radius: 8px;
  background-color: ${fromTheme('primary')};

  &:hover {
    filter: brightness(1.1);
    transform: scale(1.01);
  }

  position: relative;

  span {
    position: absolute;
    right: 25%;
    top: 50%;
    transform: translateY(-50%);
  }

  &:hover {
    transform: scale(1.01);
  }

  @media (max-width: 425px) {
    position: fixed;

    width: 90vw;
    bottom: 15px;

    span {
      right: 20%;
    }
  }
`

export const Recaptcha = styled(ReCAPTCHA)`
  display: none;
`

export default Style
