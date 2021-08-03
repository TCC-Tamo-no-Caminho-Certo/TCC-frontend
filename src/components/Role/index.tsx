import React from 'react'
import Style from './styles'

import { getRoleLabel } from 'utils/roles'

import { RoleType } from 'types/Responses/user/roles'

export interface RoleProps {
  role: RoleType
}

const Role = ({ role }: RoleProps) => {
  return <Style role={role}>{getRoleLabel(role)}</Style>
}

export default Role
