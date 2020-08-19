import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

import ReCAPTCHA from 'react-google-recaptcha'

const Style = styled.section`
  grid-area: login;
  min-width: 320px;
  width: calc(100% + 1px);
  height: 100%;
  padding: 30px;
  position: relative;
  background-color: ${fromTheme('secondary')};

  &,
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    a {
      font-size: 1.5rem;
      text-decoration: underline;
      transition: all 0.2s;
      margin-top: 7px;
      color: ${fromTheme('primary')};

      &:hover {
        font-size: 1.6rem;
        transform: translateY(3px);
      }
    }
  }

  .InputText,
  .Button {
    margin-top: 20px;
  }

  .InputText,
  .Permanence,
  .Register {
    min-width: 300px;
    width: 80vw;
    max-width: 400px;
  }

  .Button {
    width: 100%;
  }

  .ThemeSwitch {
    position: absolute;
    top: 30px;
    right: 30px;
  }

  @media screen and (min-width: 1200px) {
    border-radius: 15px 0 0 15px;

    .InputText,
    .Permanence,
    .Register {
      min-width: 340px;
      width: 22.9vw;
      max-width: 400px;
    }
  }
`

export const Google = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  padding: 10px 5px;
  cursor: pointer;
  color: ${fromTheme('tertiary')};
  border-bottom: solid 2px ${fromTheme('tertiary')};

  img {
    width: 25px;
    margin-right: 10px;
  }
`

export const Permanence = styled.label.attrs({ className: 'Permanence' })`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 7px;
  font-size: 1.5rem;
  border-bottom: 2px solid ${fromTheme('tertiary')};
  line-height: 40px;
  cursor: pointer;

  input {
    margin-right: 8px;
    border: solid red 1px;
  }
`

export const Register = styled.div.attrs({ className: 'Register' })`
  font-size: 1.5rem;
  text-align: center;
  color: ${fromTheme('tertiary')};
  margin-top: 7px;

  button {
    border: none;
    font-size: 1.5rem;
    background-color: transparent;
    text-decoration: underline;
    transition: all 0.2s;
    color: ${fromTheme('primary')};

    &:hover {
      transform: translateY(3px);
      font-size: 1.6rem;
    }
  }
`

export const Recaptcha = styled(ReCAPTCHA)`
  display: none;
`

export default Style
