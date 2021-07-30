import styled from 'styled-components'

export const LoginFailure = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  color: ${({ theme }) => theme.colors.red};

  span {
    font-size: clamp(1.4rem, 0.6rem + 2.6vw, 1.8rem);
  }

  .Icon {
    width: 24px;
    margin-right: 8px;

    fill: ${({ theme }) => theme.colors.red};
  }
`

const Style = styled.aside`
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  min-height: 80vh;

  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: -8px 8px 6px 4px rgba(0, 0, 0, 0.14);

  #content {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    width: clamp(284px, 70%, 530px);

    > * {
      width: 100%;
    }

    footer {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      padding-top: 8px;

      border-top: solid 2px ${({ theme }) => theme.colors.tertiary};

      span,
      button {
        font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.9rem);
      }

      button {
        color: ${({ theme }) => theme.colors.primary};

        &:hover,
        &:focus {
          transform: scale(1.01);
          filter: brightness(1.1);
        }
      }
    }

    .Form {
      margin: 16px 0 8px 0;

      > *:not(:last-child) {
        margin-bottom: 16px;
      }

      #submit {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        a {
          align-self: flex-end;
        }

        .Submit {
          width: 100%;

          height: max(5vh, 35px);
        }
      }
    }
  }

  @media screen and (min-width: 1200px) {
    width: 38vw;
    border-radius: 20px 0 0 20px;
  }
`

export default Style

LoginFailure.displayName = 'LoginFailure-Style'
Style.displayName = 'Aside-Style'
