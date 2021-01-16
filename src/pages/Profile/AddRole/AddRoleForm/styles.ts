import { Role } from 'store/user'

import Card, { Header as HeaderComponent } from 'components/Card/styles'
import { Form as FormComponent, Input as InputComponent } from 'components/Form'

import styled from 'styled-components'

interface ContentProps {
  role: Role
}

export const Content = styled(Card)<ContentProps>`
  height: 400px;
  max-width: 550px;
  padding-bottom: 0;

  #body {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    height: 100%;
    width: 90%;

    span {
      text-align: left;
      width: 100%;
      font-size: 2.3rem;

      color: ${({ theme, role }) => theme.roles[role]};
    }

    p {
      width: 100%;
      color: ${({ theme }) => theme.colors.tertiary};
      margin: 32px 0;
    }

    #scrollButton {
      padding: 8px;

      color: ${({ theme }) => theme.colors.primary};
    }
  }
`

export const Header = styled(HeaderComponent)`
  font-size: 24px;
  padding: 30px 50px;

  justify-content: start;
`

export const Form = styled(FormComponent)`
  width: 100%;

  & > button {
    width: 100%;
    height: 44px;
    transition: all 0.2s;

    border: none;
    border-radius: 8px;

    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};

    &:hover {
      filter: brightness(1.1);
      transform: scale(1.01);
    }
  }
`

export const Input = styled(InputComponent)`
  margin-top: 5%;
  border-radius: 150px;
  font-size: 16px;
`

const Style = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.secondary};
`

export default Style

Style.displayName = 'Student-Style'
Content.displayName = 'Content-Style'
Header.displayName = 'Header-Style'
Form.displayName = 'Form-Style'
Input.displayName = 'Input-Style'
