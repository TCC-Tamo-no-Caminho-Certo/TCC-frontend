import { Role } from 'store/user'

import Card, { Header as HeaderComponent } from 'components/Card/styles'

import styled from 'styled-components'

interface ContentProps {
  role: Role
}

export const Header = styled(HeaderComponent)`
  justify-content: start;

  font-size: 24px;
  padding: 30px 50px;
`

export const Content = styled(Card)<ContentProps>`
  width: 550px;
  padding-bottom: 0;

  #role {
    width: 100%;
    font-size: 22px;
    margin: 16px 0;

    color: ${({ theme, role }) => theme.roles[role]};
  }

  #scrollButton {
    padding: 8px;

    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 24px;
  }
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
