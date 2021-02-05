import styled from 'styled-components'

export const ConfirmToken = styled.section`
  .Icon {
    height: 20px;
    margin: 0;
  }

  .resendContainer {
    .Icon {
      margin-right: 8px;
      fill: ${({ theme }) => theme.colors.primary};
      height: 26px;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      margin-bottom: 8px;
      font-weight: bold;

      color: ${({ theme }) => theme.colors.primary};

      &:hover,
      .icon:hover {
        filter: brightness(1.1);
        transform: scale(1.01);
      }
    }
  }
`

const Style = styled.main`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-color: #6e4850;

  article {
    width: min(90%, 500px);
    padding: 20px 15px 40px;
    border-radius: 10px;

    background: #fcfcfc;
    box-shadow: -8px 8px 10px -4px rgba(0, 0, 0, 0.49);

    header {
      display: flex;
      justify-content: center;
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

    h3,
    h2 {
      font: 500 2rem 'Archivo';
    }

    h3 {
      text-align: center;
    }

    p {
      text-align: center;
      font-style: italic;
    }
  }

  h3,
  .Input,
  .resendContainer,
  .Logo {
    margin-bottom: 16px;
  }

  .submit {
    position: relative;

    width: 100%;
    height: 55px;
    transition: all 0.2s;
    font: 700 1.8rem 'Archivo';

    color: white;
    border: none;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.primary};

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

    @media (max-width: 425px) {
      position: fixed;

      width: 90vw;
      bottom: 15px;

      span {
        right: 20%;
      }
    }
  }

  .BackButton {
    position: absolute;
    top: 3%;
    left: 1%;

    color: #fcfcfc;
    transition: all 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }

    @media (max-width: 500px) {
      top: 1%;

      span {
        display: none;
      }
    }
  }
`

export default Style

Style.displayName = 'ForgotPassword-Style'
ConfirmToken.displayName = 'ConfirmToken-Style'
