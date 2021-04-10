import OriginalForm from 'components/Form'

import styled from 'styled-components'

export const Form = styled(OriginalForm)`
  width: 100%;

  color: ${({ theme }) => theme.colors.tertiary};

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
    transition: all 0s ease 0s;

    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.39);
  }

  .Checkbox {
    margin-bottom: 16px;

    .CheckboxLabel {
      font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.8rem);
    }
  }
`

Form.displayName = 'Form-Style'
