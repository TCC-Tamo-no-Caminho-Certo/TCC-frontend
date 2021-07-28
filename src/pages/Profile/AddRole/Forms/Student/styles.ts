import OriginalForm from 'components/Form'

import styled from 'styled-components'

export const Voucher = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  padding: 8px 16px;
  margin-bottom: 16px;
  border-radius: 16px;

  border: solid 1px ${({ theme }) => theme.colors.primary};

  #ar {
    width: 100%;
  }

  #warning {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 8px;

    color: ${({ theme }) => theme.colors.tertiary};

    b,
    p {
      width: 100%;
      font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.6rem);
    }

    p {
      padding: 0 8px;
      text-align: center;

      .Icon {
        height: 16px;
        margin-right: 8px;
        transform: translateY(15%);

        fill: ${({ theme }) => theme.colors.primary};
      }
    }

    b {
      color: ${({ theme }) => theme.colors.primary};
    }

    b#moderator {
      font-weight: normal;

      color: ${({ theme }) => theme.roles.moderator};
    }
  }

  .File {
    width: 100%;
  }
`

export const Ways = styled.div`
  margin-bottom: 0px;

  div {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;

    margin: 16px 0;

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

  #title {
    height: 22px;
    margin-top: 16px;
    font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.8rem);
    line-height: clamp(1.5rem, 0.6rem + 2.6vw, 1.8rem);
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

export const Form = styled(OriginalForm)`
  width: 100%;

  color: ${({ theme }) => theme.colors.tertiary};

  > * + * {
    margin-top: 16px;
  }

  span {
    width: 100%;
    text-align: left;
    font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.4rem);
  }

  .Select,
  .Text {
    height: 35px;
  }

  .Select {
    background-color: transparent;
  }

  .Submit {
    width: 100%;
    transition: all 0s ease 0s;

    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.39);
  }
`

Voucher.displayName = 'Student-Voucher-Style'
Ways.displayName = 'Student-Ways-Style'
Form.displayName = 'Student-Form-Style'
