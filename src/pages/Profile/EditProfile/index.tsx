import React, { useEffect, useRef, useState } from 'react'
import Style from './styles'

import ProfileAndRoles from './ProfileAndRoles'
import Universities from './Universities'

import api from 'services/api'

import { RootState } from 'store'
import { UserState } from 'store/Async/user'
import { getRolesData } from 'store/Async/rolesData'
import { getEmails } from 'store/Async/emails'
import { getUniversities } from 'store/Async/universities'

import useWindowDimensions from 'hooks/useWindowDimensions'

import Popup, { PopupForwardeds } from 'components/Popup'

import { useDispatch, useSelector } from 'react-redux'

const EditProfile = () => {
  const { user } = useSelector<RootState, UserState>(({ user }) => user)

  const dispatch = useDispatch()
  const { innerWidth } = useWindowDimensions()

  const [sliderWidth, setSliderWidth] = useState(innerWidth >= 600 ? 520 : 284)

  const popupRef = useRef<PopupForwardeds>(null)

  useEffect(() => {
    if (innerWidth <= 376) setSliderWidth(300)
    else if (innerWidth <= 430) setSliderWidth(350)
    else if (innerWidth <= 600) setSliderWidth(400)
    else if (innerWidth <= 700) setSliderWidth(430)
    else setSliderWidth(520)
  }, [innerWidth])

  useEffect(() => {
    console.log(user?.id)
    if (user?.id) {
      dispatch(getRolesData({ userId: user.id }))
      dispatch(getEmails({ userId: user?.id }))
      dispatch(getUniversities({}))
    }
  }, [dispatch, user?.id])

  return (
    <>
      <Style>
        <header>
          <h1>Editar perfil</h1>
        </header>

        <ProfileAndRoles sliderWidth={sliderWidth} />

        <Universities sliderWidth={sliderWidth} />

        <button
          type='button'
          onClick={() => api.delete('api/users/emails/208')}
        >
          Remover email
        </button>
      </Style>

      <Popup ref={popupRef} />
    </>
  )
}

export default EditProfile
