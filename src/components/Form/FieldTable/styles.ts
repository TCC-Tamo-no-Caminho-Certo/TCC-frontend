import styled from 'styled-components'

const Style = styled.table`
  width: 100%;
  border-collapse: collapse;

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

    .Field > div,
    .DefaultField {
      width: 100%;
    }

    .DefaultField .Icon {
    }
  }

  @media screen and (min-width: 425px) {
    td {
      padding: 0 16px;
    }
  }
`

export default Style

Style.displayName = 'Periods-Style'
