import { Form as FormComponent } from 'components/Form'

import styled from 'styled-components'

export const Form = styled(FormComponent)`
  width: 100%;

  color: ${({ theme }) => theme.colors.tertiary};

  & > * {
    margin-bottom: 16px;
  }

  .Select__control,
  .Input {
    height: 35px;
  }

  span {
    text-align: left;
    width: 100%;
    font-size: 2.3rem;
  }

  button[type='submit'] {
    width: 100%;
  }

  #ways {
    margin-bottom: 0px;

    #label {
      margin-top: 16px;
      margin-bottom: 8px;
      height: 22px;
    }

    #buttons {
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      button {
        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 4px;
        padding: 12px;

        height: 42px;

        background-color: ${({ theme }) => theme.colors.tertiary};
        color: ${({ theme }) => theme.colors.white};
      }
    }

    .iconSpace {
      width: 46px;
    }

    .Input + .Input {
      height: 35px;
      margin-top: 16px;
    }

    #warning {
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 1.5rem;
      margin-bottom: 8px;
      height: 45px;

      color: ${({ theme }) => theme.colors.red};

      b {
        font-weight: normal;

        color: ${({ theme }) => theme.roles.moderator};
      }

      .Icon {
        height: 24px;
        padding: 0 8px 0 8px;

        fill: ${({ theme }) => theme.colors.red};
      }
    }

    #inputs {
      margin-bottom: 16px;
    }
  }
`

export default Form

Form.displayName = 'StudentForm-Style'
