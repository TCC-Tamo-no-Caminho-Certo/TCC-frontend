import { RoleProps } from './index'

import { RoleType } from 'types/Responses/user/roles'

import styled from 'styled-components'

const Style = styled.div<RoleProps>`
  color: ${({ theme, role }) => theme.colors.roles[role as RoleType]};
`

export default Style

Style.displayName = 'Component-Style'
