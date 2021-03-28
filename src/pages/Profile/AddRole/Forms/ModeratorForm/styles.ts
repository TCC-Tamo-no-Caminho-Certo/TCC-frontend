import OriginalForm from 'components/Form'

import styled from 'styled-components'

export const Form = styled(OriginalForm)`
  width: 100%;

  color: ${({ theme }) => theme.colors.tertiary};

  .Checkbox {
    margin-bottom: 16px;
  }

  .Textarea {
    width: 100%;
    height: 200px;
    margin-bottom: 16px;
  }

  .Submit {
    width: 100%;

    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.39);
    transition: all 0s ease 0s;
  }
`

Form.displayName = 'Form-Style'
