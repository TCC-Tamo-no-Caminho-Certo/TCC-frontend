import Presence from 'components/Presence'

import styled from 'styled-components'

export const Voucher = styled(Presence)`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  padding: 8px 16px;
  margin-bottom: 16px;
  border-radius: 16px;

  border: solid 1px ${({ theme }) => theme.colors.primary};

  p {
    width: 100%;
    padding: 0 8px;
    text-align: center;
    margin-bottom: 8px;
    font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.6rem);

    color: ${({ theme }) => theme.colors.tertiary};

    b {
      color: ${({ theme }) => theme.colors.primary};
    }

    .Icon {
      height: 16px;
      margin-right: 8px;
      transform: translateY(15%);

      fill: ${({ theme }) => theme.colors.primary};
    }

    #moderator {
      font-weight: normal;

      color: ${({ theme }) => theme.roles.moderator};
    }
  }

  .File {
    width: 100%;
  }
`

export const Choose = styled(Presence)`
  > span {
    height: 22px;

    font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.8rem);
    line-height: clamp(1.5rem, 0.6rem + 2.6vw, 1.8rem);
  }

  div {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;

    margin-top: 8px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 42px;
      padding: 12px;
      border-radius: 4px;
      transition: all 0.2s;
      font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);

      color: ${({ theme }) => theme.colors.white};
      box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.39);
      background-color: ${({ theme }) => theme.colors.tertiary};

      &:hover {
        transform: scale(1.01);

        filter: brightness(1.1);
      }

      & + button {
        margin-top: 8px;
      }
    }
  }

  @media screen and (min-width: 425px) {
    div {
      flex-direction: row;

      button {
        width: auto;

        & + button {
          margin-top: 0px;
        }
      }
    }
  }
`

const Style = styled.div`
  > * + * {
    margin-top: 16px;
  }
`

export default Style