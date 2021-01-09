import { Role } from 'store/user'

import styled from 'styled-components'

interface RoleTdProps {
  role: Role
}

interface CircleProps {
  status: 'accepted' | 'waiting' | 'refused'
}

export const RoleTd = styled.td<RoleTdProps>`
  color: ${({ theme, role }) => theme.roles[role]};
`

export const Circle = styled.div<CircleProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: 50%;
  transform: translateX(-50%);

  background-color: ${({ theme, status }) => {
    switch (status) {
      case 'accepted':
        return theme.colors.green
      case 'waiting':
        return theme.colors.yellow
      case 'refused':
        return theme.colors.red
      default:
        return theme.colors.white
    }
  }};
`

const Style = styled.div`
  display: flex;
  align-items: center;

  flex-direction: column;

  height: 100vh;

  background-color: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.secondary};

  header {
    width: 90%;
    text-align: left;

    padding: 16px 0;
  }
`
export default Style

Style.displayName = 'Home-Style'
