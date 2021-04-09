import { Role } from 'store/AsyncThunks/roles'

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
    margin-bottom: 16px;
  }

  .RequestSvg {
    margin-bottom: 24px;
    margin-top: 16px;
  }

  #role {
    width: 100%;
    font-size: clamp(1.6rem, 0.6rem + 2.6vw, 2.2rem);
    text-align: center;

    color: ${({ theme, role }) => theme.roles[role]};
  }

  #rejected {
    width: 100%;
    padding: 16px;

    border: solid 1px ${({ theme }) => theme.colors.primary};
    border-radius: 8px;

    > p {
      text-align: justify;
      word-wrap: break-word;

      text-align: center;
      font-size: clamp(1.8rem, 0.6rem + 2.6vw, 2.1rem);
      margin-bottom: 16px;

      color: ${({ theme }) => theme.colors.red};
    }

    div {
      width: 100%;
      border-radius: 8px;

      span {
        color: ${({ theme }) => theme.colors.tertiary};
      }

      p {
        margin-top: 8px;
        font-size: clamp(1.6rem, 0.6rem + 2.6vw, 1.8rem);

        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }

  #tryAgain {
    margin: 24px 16px;
    text-align: left;
    width: 100%;
    font-size: clamp(1.8rem, 0.6rem + 2.6vw, 1.8rem);

    color: ${({ theme }) => theme.colors.tertiary};
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

const Style = styled.section`
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
