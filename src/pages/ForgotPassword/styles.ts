import styled from 'styled-components'

import fromTheme from 'utils/fromTheme'

const Style = styled.main`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-color: ${fromTheme('secondary')};

  article {
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
  }

  section {
    width: 90%;
    margin: auto;

    h3, h2 {
      font: 500 2rem 'Archivo';
    }

    h3 {
      margin-top: 10px;
      margin-bottom: 30px;
      text-align: center;
    }

    p {
      margin-top: 30px;
      margin-bottom: 0px;
      text-align: center;
      font-style: italic;
    }
  }

  button.submit {
    width: 100%;
    height: 55px;
    transition: all 0.2s;
    font: 700 1.8rem 'Archivo';

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

    @media (max-width: 425px) {
      position: fixed;

      width: 90vw;
      bottom: 15px;

      span {
        right: 20%;
      }
    }
  }

  button.backButton {
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
  }
`

export const ConfirmToken = styled.section`
  form.resendContainer {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 15px 15px 0px 15px;
  }

  .resendContainer button {
    margin: 15px;

    text-decoration: underline;
    font-weight: bold;
    color: ${fromTheme('primary')};

    &:hover {
      color: ${fromTheme('tertiary')};
    }
  }
`

Style.displayName = 'Style'
ConfirmToken.displayName = 'Confirm Token'

export default Style
