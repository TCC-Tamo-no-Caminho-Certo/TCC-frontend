import styled from 'styled-components'

const Style = styled.div.attrs({ className: 'InfoChanger' })`
  display: grid;
  grid: 'labels value change' 100%/15% 70% 15%;

  font-size: 1.5rem;
  height: 40px;
  width: 500px;
  border-radius: 5px;

  border: solid 2px #50393e;
  color: #50393e;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const Label = styled.div`
  grid-area: labels;
  justify-self: start;

  & > label {
    padding-left: 15px;
  }
`

export const Value = styled.div`
  grid-area: value;

  span {
    cursor: pointer;
  }

  input,
  & > div,
  & > span {
    min-width: 100%;
    padding: 0;

    font-size: 1.5rem;
    text-align: center;
    overflow-wrap: break-word;

    color: inherit;
  }
`

export const Change = styled.div`
  grid-area: change;
  justify-self: end;

  & > label {
    padding-right: 15px;
  }

  & > img {
    cursor: pointer;
  }
`

export default Style

Label.displayName = 'Label-Style'
Value.displayName = 'Value-Style'
Change.displayName = 'Change-Style'
Style.displayName = 'Field-Style'
