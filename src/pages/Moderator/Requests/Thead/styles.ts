import styled from 'styled-components'

const Style = styled.table`
  border-collapse: collapse;
  width: 100%;

  box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.39);

  thead {
    tr {
      position: relative;

      display: flex;
      align-items: center;

      width: calc(100% - 8px);
      padding: 0 8px 0 24px;
      height: 32px;

      #refresh {
        position: absolute;
        left: 8px;

        #RefreshIcon {
          width: 18px;
          height: 18px;
          cursor: pointer;

          fill: ${({ theme }) => theme.colors.secondary};
        }
      }

      th {
        cursor: pointer;

        button {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          user-select: none;
          height: 32px;
          overflow: hidden;
          font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);
          line-height: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);

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

          width: 32px;
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
          min-width: 100px;
        }

        &.date button {
          min-width: 64px;
        }
      }
    }
  }

  @media screen and (min-width: 545px) {
    thead tr th.role button {
      width: 165px;
    }
  }

  @media screen and (min-width: 745px) {
    thead tr {
      padding: 0 24px;
    }
  }
`

export default Style

Style.displayName = 'Thead-Style'
