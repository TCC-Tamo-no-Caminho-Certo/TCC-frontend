import styled from 'styled-components'

const Style = styled.div`
  table {
    border-collapse: collapse;
    background-color: red;

    th,
    td {
      padding: 8px;
    }

    thead tr th {
      border: solid 1px white;
    }

    tbody tr td {
      border: solid 1px white;
    }
  }
`

export default Style

Style.displayName = 'Table-Style'
