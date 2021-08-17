import OriginalForm from 'components/Form'
import Presence from 'components/Presence'

import styled from 'styled-components'

export const Choose = styled(Presence)`
  width: 100%;

  > span {
    height: 22px;
    font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.8rem);
    line-height: clamp(1.5rem, 0.6rem + 2.6vw, 1.8rem);

    color: ${({ theme }) => theme.colors.tertiary};
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
          margin-left: 8px;
        }
      }
    }
  }
`

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

  .Checkbox .CheckboxLabel {
    max-width: 250px;
    font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.7rem);
  }

  @media screen and (min-width: 440px) {
    .Checkbox .CheckboxLabel {
      max-width: none;
    }
  }
`

const Style = styled.div`
  width: 100%;

  > * + * {
    margin-top: 8px;
  }
`

export default Style

Voucher.displayName = 'Student-Voucher-Style'
Form.displayName = 'StudentProfessor-Form-Style'
