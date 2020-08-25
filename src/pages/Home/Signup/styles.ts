import styled from 'styled-components'

import ReCAPTCHA from 'react-google-recaptcha'
import fromTheme from 'utils/fromTheme'

const Style = styled.div`
  grid-area: signup;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  min-width: 320px;

  background-color: ${fromTheme('secondary')};

  header {
    position: absolute;
    top: 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    min-width: 300px;
    width: 80%;
    max-width: 1000px;
    height: 33px;

    button {
      display: flex;
      align-items: center;

      height: 100%;

      color: ${fromTheme('primary')};

      svg {
        min-width: 33px;
        min-height: 33px;
        padding: 5px;
        transform: translateX(-40%);
      }

      span {
        line-height: 100%;
        transform: translateX(-48%);
      }
    }
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    min-width: 300px;
    width: 80%;
    margin: 73px 0 20px 0;

    > span {
      font-size: 1.5rem;
      margin: 10px 0;
    }

    > * {
      width: 100%;
      max-width: 530px;
    }

    .Logo {
      margin-bottom: 20px;
    }
  }

  @media screen and (min-height: 700px) {
    form {
      margin: 0;
    }
  }

  @media screen and (min-height: 900px) {
    form {
      font-size: 1.7rem;

      > span {
        font-size: 1.6rem;
      }
    }
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
