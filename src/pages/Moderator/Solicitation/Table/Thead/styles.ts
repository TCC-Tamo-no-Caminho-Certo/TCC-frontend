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

      width: calc(100% - 8px);
      height: 32px;
      padding: 0 8px;

      th {
        height: 100%;
        text-align: left;

        cursor: pointer;

        button {
          width: 100%;
          height: 100%;
          text-align: left;
          user-select: none;

          color: ${({ theme }) => theme.colors.secondary};

          .Icon {
            width: 12px;
            margin-right: 4px;

            fill: ${({ theme }) => theme.colors.secondary};
          }
        }

        &.statusCircle button {
          display: flex;
          justify-content: center;
          align-items: center;

          min-width: 24px;
        }

        &.status button {
          display: none;
        }

        &.name {
          width: 100%;

          button {
            width: 100%;
          }
        }

        &.role button {
          min-width: 80px;
        }

        &.date button {
          justify-content: flex-end;

          text-align: right;
          min-width: 64px;
        }
      }
    }
  }

  @media screen and (min-width: 545px) {
    thead tr {
      padding: 0 32px;

      th.statusCircle button {
        width: 32px;
      }
    }
  }
`

export default Style

Style.displayName = 'Thead-Style'
