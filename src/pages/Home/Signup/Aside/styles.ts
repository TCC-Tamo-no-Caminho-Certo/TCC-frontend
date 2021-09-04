import styled from 'styled-components'

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: clamp(284px, 80%, 530px);

  > * {
    width: 100%;
  }

  header {
    height: clamp(94px, 25vw, 130px);

    .FullLogo {
      height: 100%;
    }
  }

  .Form {
    margin-top: 16px;

    > * {
      width: 100%;
    }

    span.aditionalInfo {
      display: block;

      padding: 8px 0;
    }

    .dual {
      border-radius: 10px 10px 0 0;

      &:focus {
        border-bottom-color: ${({ theme }) => theme.colors.tertiary};
      }

      & + .dual {
        border-radius: 0 0 10px 10px;

        border-top: 1px solid transparent;
      }
    }

    .Submit {
      margin-top: 16px;
      height: max(5vh, 35px);
    }
  }

  @media screen and (min-width: 1200px) {
    header {
      height: 18%;
    }
  }
`

const Style = styled.aside`
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  padding: 48px 0;
  min-height: 100vh;

  box-shadow: 4px 4px 6px 1px rgba(0, 0, 0, 0.4);
  background-color: ${({ theme }) => theme.colors.secondary};

  nav {
    position: absolute;
    top: 24px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 33px;
    width: min(80%, 1000px);

    .ThemeSwitch {
      height: max(100%, 33px);
    }
  }

  @media screen and (min-width: 1200px) {
    width: 38vw;
    border-radius: 0 20px 20px 0;

    nav {
      width: 80%;
    }
  }
`

export default Style

Content.displayName = 'Content-Style'
Style.displayName = 'Aside-Style'
