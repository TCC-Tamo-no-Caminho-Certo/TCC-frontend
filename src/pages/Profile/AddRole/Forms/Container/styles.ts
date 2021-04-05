import { Role } from 'store/roles'

import Card, { Header as HeaderComponent } from 'components/Card/styles'

import styled from 'styled-components'

interface ContentProps {
  role: Role
}

export const Header = styled(HeaderComponent)`
  justify-content: start;

  font-size: clamp(1.4rem, 0.6rem + 2.6vw, 2.1rem);
  padding-left: 24px;
  border-radius: 0;

  @media screen and (min-width: 620px) {
    border-radius: 24px 24px 0 0;
  }
`

export const Content = styled(Card)<ContentProps>`
  width: clamp(320px, 100vw, 550px);
  border-radius: 0;

  padding-bottom: 16px;

  #role {
    width: 100%;
    font-size: clamp(1.6rem, 0.6rem + 2.6vw, 2rem);
    margin-bottom: 16px;

    color: ${({ theme, role }) => theme.roles[role]};
  }

  #scrollButton {
    padding: 8px;
    margin-bottom: 24px;

    color: ${({ theme }) => theme.colors.tertiary};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  @media screen and (min-width: 620px) {
    border-radius: 24px;
  }
`

const Style = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 48px 0;
  min-height: 100vh;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.secondary};

  #delete {
    position: absolute;
    top: 0;
    left: 100px;
    width: 300px;
    height: 48px;
  }
`

export default Style

Header.displayName = 'Header-Style'
Content.displayName = 'Content-Style'
Style.displayName = 'Container-Style'
