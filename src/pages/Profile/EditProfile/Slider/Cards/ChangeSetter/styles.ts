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
  }
`

export const Label = styled.div`
  grid-area: labels;
`

export const Value = styled.div`
  grid-area: value;

  span {
    cursor: pointer;
  }

  div, input, span {
    font-size: inherit;
    font-family: inherit;
    color: inherit;
    text-align: center;
    overflow-wrap: break-word;
    min-width: 100%;
    padding: 0;
  }
`

export const Change = styled.div`
  grid-area: change;
  img {
    cursor: pointer;
  }
`

export default Style

Style.displayName = 'Style'
Label.displayName = 'Label'
Value.displayName = 'Value'
Change.displayName = 'Change'