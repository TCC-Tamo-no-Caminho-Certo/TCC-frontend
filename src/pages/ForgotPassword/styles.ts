import styled from 'styled-components'

import fromTheme from '../../utils/fromTheme'

export const Style = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${fromTheme('secondary')};
`
export const Container = styled.article`
  width: min(90%, 500px);
  padding: 20px 15px 40px;
  border-radius: 10px;

  box-shadow: 0 0 5px ${fromTheme('tertiary')};
  background: #f9f9f9;

  header {
    display: flex;
    justify-content: center;
    padding: 15px 0;
  }

  @media (max-width: 425px) {
    width: 100%;
    box-shadow: none;
    padding: 10% 0 0 0;
    height: 100vh;
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

  div.reSendContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
  }

  button.reSend {
    margin: 15px;
    font-weight: bold;
    text-decoration: underline;
    color: ${fromTheme('primary')};

    &:hover {
      color: ${fromTheme('tertiary')};
    }
  }
`

export const Button = styled.button`
  width: 100%;
  height: 60px;
  color: ${fromTheme('secondary')};
  background-color: ${fromTheme('primary')};
  border: none;
  border-radius: 8px;
  transition: all 0.2s;

  font: 700 1.8rem 'Archivo';

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
    span {
      right: 20%;
    }

    width: 90vw;
    position: fixed;
    bottom: 15px;
  }
`
