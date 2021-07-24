import Card, { Header as HeaderComponent } from 'components/Card/styles'

import styled from 'styled-components'
import { Role } from 'types/Responses/user/roles'

interface ContentProps {
  role: Role
}

export const Header = styled(HeaderComponent)`
  justify-content: start;

  border-radius: 0;
  padding-left: 24px;
  font-size: clamp(1.4rem, 0.6rem + 2.6vw, 2.1rem);

  @media screen and (min-width: 620px) {
    border-radius: 24px 24px 0 0;
  }
`

export const Content = styled(Card)<ContentProps>`
  border-radius: 0;
  padding-bottom: 16px;
  width: clamp(320px, 100vw, 550px);

  .RequestSvg {
    margin-top: 16px;
    margin-bottom: 24px;
  }

  #feedback {
    width: 100%;

    p {
      width: 100%;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
  }

  #role {
    width: 100%;
    text-align: center;
    margin-bottom: 16px;
    font-size: clamp(1.6rem, 0.6rem + 2.6vw, 2.2rem);

    color: ${({ theme, role }: any) => theme.roles[role]};
  }

  #rejected {
    width: 100%;
    padding: 16px;
    border-radius: 8px;

    border: solid 1px ${({ theme }) => theme.colors.primary};

    > p {
      text-align: center;
      margin-bottom: 16px;
      word-wrap: break-word;
      font-size: clamp(1.8rem, 0.6rem + 2.6vw, 2.1rem);

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
    width: 100%;
    text-align: left;
    margin: 24px 16px;
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
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  min-height: 100vh;

  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.tertiary};
`

export default Style

Header.displayName = 'Header-Style'
Content.displayName = 'Content-Style'
Style.displayName = 'Container-Style'
