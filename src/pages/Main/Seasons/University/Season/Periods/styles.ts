import styled from 'styled-components'

const Style = styled.table`
  width: 100%;
  margin-top: 24px;
  border-collapse: collapse;

  background-color: ${({ theme }) => theme.colors.secondary};

  th,
  td {
    height: 45px;
    text-align: center;

    border: solid 1px ${({ theme }) => theme.colors.tertiary};
  }

  th {
    width: 50%;
  }

  td {
    padding: 0 8px;
  }
`

export default Style

Style.displayName = 'Periods-Style'
