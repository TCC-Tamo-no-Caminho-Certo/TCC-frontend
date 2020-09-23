import styled from 'styled-components'

const Style = styled.div.attrs({ className: 'ChangeSetter' })`
  display: grid;
  grid: 'labels value change' 100%/20% 65% 15%;

  font-size: 1.5rem;
  height: 40px;
  width: 500px;
  border-radius: 5px;

  border: solid 2px #50393e;
  color: #50393e;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 2px;

    span {
      text-align: center;
      overflow-wrap: break-word;
      min-width: 100%;
    }
  }
`

export const Label = styled.div`
  grid-area: labels;
`
export const Value = styled.div`
  grid-area: value;
`

export const Change = styled.div`
  grid-area: change;
  color: #ff6d8d;
`

export default Style
