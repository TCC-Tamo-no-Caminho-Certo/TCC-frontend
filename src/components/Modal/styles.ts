import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  /* display: none; */
  position: fixed;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.8);

  display: flex;
  align-items: center;
  justify-content: center;

  div {
    width: min(400px, 80vw);
    background: white;
    border-radius: 10px;
    padding: 30px;
    text-align: center;
  }
`
