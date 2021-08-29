import React, { Dispatch, SetStateAction } from 'react'
import Style, { RoleLi } from './styles'

import { getRoleLabel } from 'utils/roles'

import { UserActions, UserState } from 'store/Async/user'
import { RootState } from 'store'

import CloseIcon from 'assets/global/CloseIcon'

import { RoleType } from 'types/Responses/user/roles'

import { useDispatch, useSelector } from 'react-redux'

interface RolesToSelectProps {
  state: boolean
  setState: Dispatch<SetStateAction<boolean>>
}

const RolesToSelect = ({ state, setState }: RolesToSelectProps) => {
  const dispatch = useDispatch()
  const { user } = useSelector<RootState, UserState>(({ user }) => user)

  const onRoleClick = (role: RoleType) =>
    dispatch(UserActions.update({ selectedRole: role }))

  return state ? (
    <Style onMouseLeave={() => setState(false)}>
      {innerWidth < 545 && <CloseIcon onClick={() => setState(false)} />}

      <ul>
        {user?.roles?.map(role => (
          <RoleLi key={role} role={role}>
            <button type='button' onClick={() => onRoleClick(role)}>
              {getRoleLabel(role)}
            </button>
          </RoleLi>
        ))}
      </ul>
    </Style>
  ) : (
    <></>
  )
}

export default RolesToSelect
