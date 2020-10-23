import styled from 'styled-components'

const Style = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  padding: 60px 20px 20px 20px;
  border-radius: 16px;
  user-select: none;

  background-color: white;
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.8);

  > img {
    width: 128px;
    height: 128px;

    border-radius: 50%;
  }

  > *,
  form .ChangeSetter {
    margin-bottom: 24px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  form > button {
    width: 65%;
    height: 40px;
    border-radius: 15px;

    color: #eee;
    background-color: #ff6d8d;
  }
`

export const Header = styled.header`
  position: absolute;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 40px;
  border-radius: 16px 16px 0 0;

  background-color: #ff6d8d;
  color: white;
`

export const Content = styled.div.attrs({ className: 'ChangeSetter' })`
  display: grid;
  grid: 'labels value change' 100%/15% 70% 15%;

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
  justify-self: end;

  & > label {
    padding-right: 15px;
  }

  & > img {
    cursor: pointer;
  }
`

export default Style

Style.displayName = 'Card-Style'
Label.displayName = 'Label-Style'
Value.displayName = 'Value-Style'
Change.displayName = 'Change-Style'
Header.displayName = 'Header-Style'
Content.displayName = 'Infos-Style'
