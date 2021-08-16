import React, { useEffect, useState } from 'react'
import Style from './styles'

import ProfileRoles from './ProfileAndRoles'
import Universities from './Universities'

import api from 'services/api'

import { RootState } from 'store'
import { AsyncUserState } from 'store/Async/user'
import { getRolesData } from 'store/Async/rolesData'
import { getEmails } from 'store/Async/emails'
import { getUniversities } from 'store/Async/universities'

import useWindowDimensions from 'hooks/useWindowDimensions'

import { useDispatch, useSelector } from 'react-redux'

const EditProfile = () => {
  const { user } = useSelector<RootState, AsyncUserState>(
    ({ asyncUser }) => asyncUser
  )

  const dispatch = useDispatch()
  const { innerWidth } = useWindowDimensions()

  const [sliderWidth, setSliderWidth] = useState(innerWidth >= 600 ? 520 : 284)

  useEffect(() => {
    if (innerWidth <= 430) setSliderWidth(320)
    else if (innerWidth <= 600) setSliderWidth(440)
    else if (innerWidth <= 700) setSliderWidth(450)
    else setSliderWidth(520)
  }, [innerWidth])

  useEffect(() => {
    if (user?.id) {
      dispatch(getRolesData({ userId: user.id }))
      dispatch(getEmails({ userId: user?.id }))
      dispatch(getUniversities())
    }
  }, [dispatch, user?.id])

  return (
    <Style>
      <header>
        <h1>Editar perfil</h1>
      </header>
      <ProfileRoles sliderWidth={sliderWidth} />

      <Universities sliderWidth={sliderWidth} />

      <button type='button' onClick={() => api.delete('api/users/emails/204')}>
        Remover email
      </button>
    </Style>
  )
}

export default EditProfile
