import React, { useCallback, useEffect, useState } from 'react'
import Style from './styles'

import api from 'services/api'

import { RootState } from 'store'
import { AsyncUserState } from 'store/Async/user'
import { AsyncEmailsState } from 'store/Async/emails'
import {
  AsyncUniversitiesState,
  getUniversities
} from 'store/Async/universities'
import { AsyncRolesDataState } from 'store/Async/rolesData'

import Slider from 'components/Slider'

import { UniversitiesResType } from 'types/Responses/university/universities'

import { useSelector } from 'react-redux'

interface UniversitiesProps {
  sliderWidth: number
}

const Universities = ({ sliderWidth }: UniversitiesProps) => {
  const { user } = useSelector<RootState, AsyncUserState>(
    ({ asyncUser }) => asyncUser
  )
  const { emails } = useSelector<RootState, AsyncEmailsState>(
    ({ asyncEmails }) => asyncEmails
  )
  const { universities } = useSelector<RootState, AsyncUniversitiesState>(
    ({ asyncUniversities }) => asyncUniversities
  )

  const [containers, setContainers] = useState<any[]>()

  const getUserUniversities = useCallback(async () => {
    if (user?.id) {
      const roles: UniversitiesResType = await api.get(
        `users/${user?.id}/roles/universities`
      )

      const universitiesByEmails = emails.filter(
        ({ university_id }) =>
          !roles.universities.find(({ id }) => id === university_id) &&
          university_id !== null
      )

      const formatUniversitiesByEmails = universitiesByEmails.map(
        ({ university_id }) => {
          const foundUniversity = universities.find(
            ({ id }) => university_id === id
          )

          return {
            id: foundUniversity?.id,
            name: foundUniversity?.name,
            regex: foundUniversity?.regex
          }
        }
      )

      setContainers([...roles.universities, ...formatUniversitiesByEmails])
    }
  }, [user?.id, emails, universities])

  useEffect(() => {
    getUserUniversities()
  }, [getUserUniversities])

  return (
    <Style>
      {/* <Slider gap={200} gapVertical={32} width={sliderWidth}>
        containers
      </Slider> */}
    </Style>
  )
}

export default Universities
