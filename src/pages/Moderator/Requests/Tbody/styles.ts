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
  color: ${({ theme, role }) => theme.roles[role]};
`

const Style = styled.div`
  width: 100%;
  overflow-y: scroll;
  height: calc(100vh - 147px);

  &::-webkit-scrollbar {
    width: 8px;
  }

  table {
    width: 100%;

    tbody {
      position: relative;

      border: none;

      tr {
        display: flex;
        align-items: center;

        width: 100%;
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

          min-height: 32px;
          padding: 8px 4px;
          font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);
          line-height: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);

          &.statusCircle {
            display: flex;
            align-items: center;
            justify-content: center;

            height: 32px;
            min-width: 32px;
          }

          &.status {
            display: none;

            min-width: 100px;
          }

          &.name {
            width: 100%;
          }

          &.role {
            min-width: 100px;

            max-width: 100px;
          }

          &.date {
            min-width: 64px;
          }
        }
      }
    }
  }

  @media screen and (min-width: 545px) {
    table tbody tr {
      padding: 0 24px;
    }
  }
`

export default Style

Circle.displayName = 'Circle-Style'
RoleTd.displayName = 'RoleTd-Style'
Style.displayName = 'Tbody-Style'
