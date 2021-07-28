import React from 'react'
import Style from './styles'

import Avatar from '../Avatar'

import { getRoleLabel } from 'utils/roles'

import { RoleType } from 'types/Responses/user/roles'

interface AvatarAndInfoProps {
  name: string
  role: RoleType
  avatarId?: string
}

const AvatarAndInfo = ({ name, role, avatarId }: AvatarAndInfoProps) => {
  return (
    <Style className='AvatarAndInfo'>
      <Avatar avatarId={avatarId} size={72} />

      <div>
        <span>{name}</span>
        <span>{getRoleLabel(role)}</span>
      </div>
    </Style>
  )
}

export default AvatarAndInfo
