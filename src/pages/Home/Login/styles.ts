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

export const Content = styled.div`
  width: calc(100% - 1px);
  height: 100%;
  margin-top: 73px;

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
    margin-bottom: 20px;

    &:last-child {
      margin: 0;
    }
  }

  form {
    > * {
      width: 100%;
      margin-bottom: 20px;

      &:last-child {
        margin: 0;
      }
    }

    a {
      margin-top: 7px;
      font-size: 1.5rem;
      text-decoration: underline;

      transition: all 0.2s;
      color: ${fromTheme('primary')};

      &:hover {
        font-size: 1.6rem;
        transform: translateY(3px);
      }
    }
  }

  label {
    flex-direction: row;

    font-size: 1.5rem;
    line-height: 40px;

    cursor: pointer;
    border-bottom: 2px solid ${fromTheme('tertiary')};

    input {
      margin-right: 8px;
    }
  }

  a {
    margin-bottom: 5px;
  }

  @media screen and (min-height: 698px) {
    form {
      margin-top: 0;
    }
  }
`

export const Google = styled.button.attrs({ type: 'button' })`
  flex-direction: row;
  width: auto;
  padding: 10px 5px;

  cursor: pointer;
  color: ${fromTheme('tertiary')};
  border-bottom: solid 2px ${fromTheme('tertiary')};

  span {
    font-size: 1.5rem;
  }

  img {
    width: 25px;
    margin-right: 10px;
  }
`

export const Register = styled.div`
  font-size: 1.5rem;
  text-align: center;
  padding: 10px 0;

  color: ${fromTheme('tertiary')};

  button {
    font-size: 1.5rem;
    text-decoration: underline;

    border: none;
    background-color: transparent;
    color: ${fromTheme('primary')};
  }
`

export const Recaptcha = styled(ReCAPTCHA)`
  display: none;
`

export default Style
