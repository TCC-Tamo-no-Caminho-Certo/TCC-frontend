import styled from 'styled-components'

const Style = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  .Card {
    justify-content: center;
    padding-top: 0;

    width: 800px;
    height: 800px;

    header {
      font-size: 2.8rem;
      height: 64px;
    }

    #role {
      text-align: center;
      font-size: 2.8rem;
      width: 100%;
      margin-bottom: 24px;

      color: #00d053;
    }

    #requestRow {
      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 100%;
      margin-bottom: 24px;
      text-align: center;
      font-size: 1.8rem;
      padding: 0 24px;

      color: #6e4850;

      div {
        width: 100px;
      }
    }

    svg {
      width: 100%;
      padding: 0 48px;

      path.checkIcon {
        fill: #fcfcfc;
      }

      path.errorIcon {
        stroke: #fcfcfc;
        stroke-width: 3;
      }

      stop#true {
        stop-color: #ff6d8d;
      }

      stop#false {
        stop-color: #6e4850;
      }
    }

    #buttonsRow {
      position: absolute;
      bottom: 32px;

      display: flex;
      justify-content: space-evenly;
      align-items: center;

      width: 100%;

      button#info {
        font-size: 2rem;

        color: #6e4850;
      }

      button#cancel {
        font-size: 2rem;
        border-radius: 8px;
        padding: 8px 32px;

        color: #d65881;
        border: solid #d65881 1px;
      }
    }
  }
`

export default Style
