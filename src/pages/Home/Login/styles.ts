import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

const Style = styled.section`
  grid-area: login;
  min-width: 320px;
  width: calc(100% + 1px);
  height: 100%;
  padding: 30px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: ${fromTheme('secondary')};

  .InputText + .InputText {
    margin-top: 20px;
  }

  .InputText,
  .Permanence,
  .Button {
    min-width: 300px;
    width: 80vw;
    max-width: 400px;
  }

  @media screen and (min-width: 1200px) {
    border-radius: 15px 0 0 15px;

    .InputText,
    .Permanence,
    button {
      min-width: 340px;
      width: 22.9vw;
      max-width: 400px;
    }
  }
`

export const ThemeSwitch = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  display: flex;
  align-items: center;
  color: ${fromTheme('primary')};
  font-size: 1.8rem;

  label {
    font-family: 'Satisfy', cursive;
    margin-right: 20px;
  }
`

export const Content = styled.div`
  &,
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  form button {
    margin-top: 20px;
  }
`

export const Register = styled.div`
  font-size: 1.5rem;
  margin-top: 20px;
  text-align: center;
  color: ${fromTheme('tertiary')};

  button {
    border: none;
    text-decoration: underline;
    background-color: transparent;
    color: ${fromTheme('primary')};
    transition: transform 2s;
    font-size: 1.5rem;

    &:hover {
      transform: scale(1.09);
    }
  }
`

export const Google = styled.div`
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 5px;
  margin-bottom: 20px;
  cursor: pointer;
  color: ${fromTheme('tertiary')};
  border-bottom: solid 2px ${fromTheme('tertiary')};

  img {
    width: 25px;
    margin-right: 10px;
  }
`

export const Permanence = styled.label.attrs({ className: 'Permanence' })`
  font-size: 1.5rem;
  margin-top: 20px;
  line-height: 40px;
  border-bottom: 2px solid ${fromTheme('tertiary')};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  input {
    margin-right: 8px;
  }
`

export default Style
