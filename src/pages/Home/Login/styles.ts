import styled from 'styled-components'
import Button from 'components/Button/index'
import fromTheme from 'utils/fromTheme'

export const Style = styled.section`
  grid-area: login;
  width: calc(100% + 1px);
  height: 100%;
  padding: 30px;
  display: flex;
  position: relative;
  align-items: center;
  border-radius: 10px 0 0 10px;
  justify-content: center;
  background-color: ${fromTheme('secondary')};

  .InputText + .InputText {
    margin-top: 20px;
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
`

export const LoginButton = styled(Button)`
  margin-top: 20px;
`

export const Register = styled.div`
  margin-top: 20px;
  text-align: center;
  color: ${fromTheme('tertiary')};

  button {
    border: none;
    text-decoration: underline;
    background-color: transparent;
    color: ${fromTheme('primary')};
    transition: transform 2s;

    &:hover {
      transform: scale(1.09);
    }
  }
`
