// import fromTheme from 'utils/fromTheme'

import styled from 'styled-components'

const Style = styled.div`
  display: flex;

  font-size: 1.5rem;
  height: 40px;
  width: 500px;
  border-radius: 5px;

  border: solid 2px #50393e;
  color: #50393e;

  button {
    width: 100%;
    height: 100%;
  }

  .label {
    width: 20%;
    padding-left: 2%;
    text-align: left;
  }

  .input {
    width: 60%;
    height: 100%;

    .InputChange,
    .InputDate,
    .DatePicker,
    .DefaultDate {
      height: 100%;

      input {
        width: 100%;
        height: 100%;

        text-align: center;
        font-size: 1.6rem;
        border-radius: 0;
      }
    }
  }

  .icon {
    width: 20%;
    text-align: right;
    padding-right: 2%;

    .Icon {
      width: 18px;
      height: 18px;

      fill: #ec5878;
      stroke: #ec5878;
    }
  }
`

export default Style

Style.displayName = 'Field-Style'
