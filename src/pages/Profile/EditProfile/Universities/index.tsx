import React, { useCallback, useEffect, useState } from 'react'
import Style from './styles'

import api from 'services/api'

import { RootState } from 'store'
import { AsyncUserState } from 'store/Async/user'
import { AsyncEmailsState } from 'store/Async/emails'
import { AsyncUniversitiesState } from 'store/Async/universities'

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
        `api/users/${user?.id}/roles/universities`
      )

      const universitiesByEmails = emails
        .filter(
          ({ university_id }) =>
            !roles.universities.find(({ id }) => id === university_id) &&
            university_id !== null
        )
        .map(({ university_id }) => ({ id: university_id }))

      const universitiesByRoles = roles.universities.map(({ id }) => id)

      const idsOfuserUniversities = [
        ...universitiesByRoles,
        ...universitiesByEmails
      ]

      const formatedContainer = idsOfuserUniversities.map(containerId => {
        const foundUniversity = universities?.find(
          ({ id }) => containerId === id
        )

        return {
          id: foundUniversity?.id,
          name: foundUniversity?.name,
          regex: foundUniversity?.regex
        }
      })

      setContainers(formatedContainer)
    }
  }, [user?.id, emails, universities])

  useEffect(() => {
    getUserUniversities()
  }, [getUserUniversities])

  return (
    <Style>
      <Slider gap={200} gapVertical={32} width={sliderWidth}>
        {containers?.map(({ name }) => name)}
      </Slider>
    </Style>
  )
}

export default Universities
