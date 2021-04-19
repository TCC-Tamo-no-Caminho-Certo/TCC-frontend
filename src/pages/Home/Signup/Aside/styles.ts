import styled from 'styled-components'

const Style = styled.aside`
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  padding: 48px 0;
  min-height: 100vh;
  width: max(100vw, 320px);

  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 8px 8px 6px 4px rgba(0, 0, 0, 0.14);

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

  #content {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    width: clamp(284px, 80%, 530px);

    > * {
      width: 100%;
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
        height: max(5vh, 35px);
      }
    }
  }

  @media screen and (min-width: 1200px) {
    border-radius: 0 20px 20px 0;
    width: 38vw;

    nav {
      width: 80%;
    }
  }
`

export default Style

Style.displayName = 'Aside-Style'
