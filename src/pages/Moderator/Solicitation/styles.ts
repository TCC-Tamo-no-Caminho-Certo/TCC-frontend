import { Role } from 'store/user'

import styled from 'styled-components'

interface RoleTdProps {
  role: Role
}

export const RoleTd = styled.td<RoleTdProps>`
  color: ${({ theme, role }) => theme.roles[role]};
`

const Style = styled.div`
  display: flex;
  align-items: center;

  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.secondary};

  header {
    display: flex;
    align-items: center;

    width: 90%;
    height: 64px;
    text-align: left;
  }
`
export default Style

Style.displayName = 'Home-Style'
