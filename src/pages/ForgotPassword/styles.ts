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

  div {
    display: flex;
    justify-content: center;
    padding: 15px 0;
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

  button {
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
  }
`
