import { getStatusColor, StatusTypes } from 'utils/status'

import { Role } from 'store/Async/roles'

import { darken } from 'polished'
import styled from 'styled-components'

interface CircleProps {
  status?: StatusTypes
}

interface RoleTdProps {
  role: Role
}

export const Circle = styled.div<CircleProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;

  background-color: ${({ theme, status }) => getStatusColor(theme, status)};
`

export const RoleTd = styled.td<RoleTdProps>`
  color: ${({ theme, role }: any) => theme.roles[role]};
`

const Style = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  table {
    width: 100%;

    tbody {
      position: relative;

      tr {
        display: flex;
        align-items: center;

        min-height: 32px;

        &:hover {
          cursor: pointer;

          background-color: ${({ theme }) =>
            darken(0.1, theme.colors.tertiary)};
        }

        td {
          display: flex;
          overflow: hidden;
          align-items: center;

          padding: 8px;
          min-width: 32px;
          min-height: 32px;

          font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);
          line-height: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);
        }
      }
    }
  }
`

export default Style

Circle.displayName = 'Circle-Style'
RoleTd.displayName = 'RoleTd-Style'
Style.displayName = 'Tbody-Style'
