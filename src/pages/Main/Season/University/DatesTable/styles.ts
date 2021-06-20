import Form from 'components/Form'

import styled from 'styled-components'

const Style = styled(Form)`
  table {
    width: 100%;
    margin-top: 24px;
    border-collapse: collapse;

    border: solid 2px ${({ theme }) => theme.colors.tertiary};

    th,
    td {
      padding: 8px 0px;
      height: 42px;
      text-align: center;

      border: solid 1px ${({ theme }) => theme.colors.tertiary};
    }

    th {
      width: 50%;
    }
  }
`

export default Style
