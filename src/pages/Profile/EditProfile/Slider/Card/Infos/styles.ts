import styled from 'styled-components'

export const Label = styled.div`
  grid-area: labels;
`

export const Value = styled.div`
  grid-area: value;

  span {
    cursor: pointer;
  }

  div,
  input,
  span {
    min-width: 100%;
    padding: 0;

    font-size: inherit;
    font-family: inherit;
    text-align: center;
    overflow-wrap: break-word;

    color: inherit;
  }
`

export const Change = styled.div`
  grid-area: change;

  img {
    cursor: pointer;
  }
`

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

export default Style

Label.displayName = 'Label-Style'
Value.displayName = 'Value-Style'
Change.displayName = 'Change-Style'
Style.displayName = 'Infos-Style'
