import styled from 'styled-components'

import fromTheme from 'utils/fromTheme'

interface Props {
  theme: any
  color: string
}

// const Colors = {
//   alert: '#fc952b',
//   error: '#e8423f',
//   success: '#13c47c',
// }

export const Container = styled.div`
  width: 101vw;
  height: 101vh;

  overflow-x: hidden;
  position: fixed;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.6);

  display: flex;
  align-items: center;
  justify-content: center;
`
export const ModalBox = styled.div<Props>`
  width: min(350px, 80vw);
  border: 2px solid #ccc;

  background: ${fromTheme('secondary')};
  border-radius: 15px;
  text-align: center;

  header {
    color: ${props => props.color};
    padding: 10px;
    border-bottom: 1px solid #aaa;

    h1 {
      font-weight: 600;
    }
  }

  section {
    p {
      text-align: center;

      padding: 20px;
    }

    button {
      margin-bottom: 10px;
      font: 500 1.6rem 'Archivo';
      padding: 8px 30px;
      border-radius: 5px;
      background: ${fromTheme('primary')};
      color: ${fromTheme('secondary')};

      &:hover {
        filter: brightness(1.1);
      }
    }
  }
`
// ${props => props.color};
