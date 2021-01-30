import styled from 'styled-components'

const Style = styled.table`
  border-collapse: collapse;
  width: 100%;
  box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.39);

  thead {
    width: 100%;
    padding-right: 8px;

    tr {
      display: flex;
      align-items: center;

      width: 100%;
      height: 32px;
    }

    th {
      width: 30%;
      height: 100%;
      text-align: left;

      padding-right: 8px;

      cursor: pointer;

      button {
        height: 100%;
        text-align: left;
        user-select: none;

        color: ${({ theme }) => theme.colors.secondary};

        .Icon {
          width: 12px;
          margin-right: 8px;

          fill: ${({ theme }) => theme.colors.secondary};
        }
      }
    }

    th.statusCircle {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 32px;
      margin-left: 5%;
      padding: 0;
    }

    th:last-child {
      justify-content: flex-end;

      text-align: right;
      margin-right: 5%;
    }
  }
`

export default Style

Style.displayName = 'Thead-Style'
