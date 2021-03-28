import OriginalForm from 'components/Form'

import styled from 'styled-components'

export const Form = styled(OriginalForm)`
  width: 100%;

  color: ${({ theme }) => theme.colors.tertiary};

  span {
    text-align: left;
    width: 100%;
    font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.4rem);
  }

  .Select,
  .Text {
    height: 35px;
  }

  .Select {
    margin-bottom: 16px;
    background-color: transparent;
  }

  .Text {
    margin-bottom: 16px;
  }

  .Submit {
    width: 100%;

    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.39);
    transition: all 0s ease 0s;
  }

  .Checkbox {
    margin-bottom: 16px;

    .CheckboxLabel {
      font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.8rem);
    }
  }
`
Form.displayName = 'Form-Style'
