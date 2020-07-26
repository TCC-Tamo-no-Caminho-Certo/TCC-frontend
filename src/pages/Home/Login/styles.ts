import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'
import Button from 'components/Button/index'

export const Style = styled.section`
  grid-area: login;
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${fromTheme('secondary')};
`

export const ThemeSwitch = styled.div`
  position: absolute;
  right: 10%;
  top: 5%;
  display: flex;
  align-items: center;
  color: ${fromTheme('primary')};

  span {
    font-family: 'Satisfy', cursive;
    display: block;
    font-size: 1.2rem;
    margin-right: 20px;
    transform: translateY(-1px);
  }

  @media screen and (min-width: 1200px) {
    right: 3vw;
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
  background-image: none;
  font-size: 1.1rem;
  width: 120px;
  height: 36px;
  border-width: 0px;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #80535d;
  color: ${fromTheme('secondary')};
  margin-top: 20px;
`

export const SignupButton = styled(Button)`
  margin-top: 20px;
`
