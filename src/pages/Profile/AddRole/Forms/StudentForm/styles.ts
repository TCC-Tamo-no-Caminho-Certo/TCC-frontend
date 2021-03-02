import { Form as FormComponent } from 'components/Form'

import styled from 'styled-components'

export const Form = styled(FormComponent)`
  width: 100%;

  color: ${({ theme }) => theme.colors.tertiary};

  .Select,
  .Text {
    height: 35px;
  }

  .Select {
    margin-bottom: 16px;
  }

  span {
    text-align: left;
    width: 100%;
    font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.4rem);
  }

  button[type='submit'] {
    width: 100%;
  }

  #ways {
    margin-bottom: 0px;

    #label {
      height: 22px;
      margin-top: 16px;

      font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.4rem);
    }

    #buttons {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      flex-direction: column;

      margin: 8px 0 16px 0;

      button {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 42px;
        border-radius: 4px;
        padding: 12px;

        background-color: ${({ theme }) => theme.colors.tertiary};
        color: ${({ theme }) => theme.colors.white};

        & + button {
          margin-top: 8px;
        }
      }
    }

    #inputs {
      margin-bottom: 16px;

      .Text {
        padding-left: 8px;
      }

      #receipt {
        display: flex;
        flex-direction: column;
        align-items: center;

        #warning {
          display: flex;
          justify-content: center;
          align-items: center;

          font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.4rem);

          margin-bottom: 8px;
          height: 45px;

          color: ${({ theme }) => theme.colors.primary};

          b {
            font-weight: normal;

            color: ${({ theme }) => theme.roles.moderator};
          }

          .Icon {
            height: 24px;
            padding: 0 8px 0 8px;

            fill: ${({ theme }) => theme.colors.primary};
          }
        }
      }
    }
  }

  @media screen and (min-width: 425px) {
    #ways #buttons {
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

export default Form

Form.displayName = 'StudentForm-Style'
