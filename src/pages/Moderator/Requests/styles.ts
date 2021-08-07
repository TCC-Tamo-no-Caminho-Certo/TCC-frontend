import { getStatusColor, StatusTypes } from 'utils/status'

import styled from 'styled-components'

interface CircleProps {
  status?: StatusTypes
}

export const CircleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Circle = styled.div<CircleProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 8px;
  height: 8px;
  border-radius: 50%;

  background-color: ${({ theme, status }) => getStatusColor(theme, status)};
`

const Style = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  height: 100vh;
  overflow-y: hidden;

  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.tertiary};

  header {
    display: flex;
    text-align: left;
    align-items: center;

    width: max(100%, 280px);
    padding: 16px 16px 0 16px;
  }

  .Table {
    .status {
      width: 5%;
    }

    .name {
      width: 60%;
    }

    .role {
      width: 20%;
    }

    .date {
      width: 15%;
    }
  }

  .TableFilters {
    width: 100%;
    padding: 16px;

    caret-color: ${({ theme }) => theme.colors.secondary};

    > * + * {
      margin-top: 16px;
    }

    .row {
      display: flex;
      flex-direction: column;

      > * {
        width: 100%;

        + * {
          margin-top: 16px;
        }
      }
    }
  }

  @media screen and (min-width: 545px) {
    .TableFilters .row {
      flex-direction: row;

      > * + * {
        margin-left: 24px;
        margin-top: 0px;
      }
    }
  }
`

export default Style

Circle.displayName = 'Circle-Style'
Style.displayName = 'Requests-Style'
