import styled from 'styled-components'

const Style = styled.table`
  width: 100%;
  border-collapse: collapse;

  box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.39);

  thead tr {
    position: relative;

    display: flex;
    align-items: center;

    height: 32px;
    padding: 0 10px 0 34px;
    width: 100%;

    th {
      cursor: pointer;

      button {
        padding: 0 8px;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        width: 100%;
        height: 32px;
        overflow: hidden;
        user-select: none;
        font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);
        line-height: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);

        color: ${({ theme }) => theme.colors.secondary};

        .Icon {
          width: 12px;
          margin-right: 4px;

          fill: ${({ theme }) => theme.colors.secondary};
        }
      }
    }

    #refresh {
      position: absolute;
      left: 0px;

      display: flex;
      justify-content: center;
      align-items: center;

      height: 34px;
      width: 34px;

      #RefreshIcon {
        width: 18px;
        height: 18px;
        cursor: pointer;

        fill: ${({ theme }) => theme.colors.secondary};
      }
    }
  }
`

export default Style

Style.displayName = 'Thead-Style'
