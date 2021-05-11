import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    .calendar {
      width: 24px;
      margin-right: 16px;

      fill: ${({ theme }) => theme.colors.primary};
    }

    #pencil {
      height: 18px;
      margin-right: 16px;

      fill: ${({ theme }) => theme.colors.primary};
    }

    #close {
      width: 18px;
      margin-left: 16px;

      stroke: ${({ theme }) => theme.colors.primary};
    }
  }
`

export default Style
