import React, { forwardRef, useEffect } from 'react'
import Style from './styles'

import University from './University'

import { RootState } from 'store'
import { UserState } from 'store/Async/user'
import {
  getUniversities,
  UniversitiesState,
  University as UniversityType
} from 'store/Async/universities'

import { useDispatch, useSelector } from 'react-redux'

const getAllUniversitiesOfUser = (
  user: UserState,
  { universities }: UniversitiesState
) => {
  const roleUniversities: any = user.roles.map(role =>
    role === 'professor' || role === 'moderator' || role === 'student'
      ? user[role]
      : ''
  )

  if (roleUniversities) {
    const ids: any[] = []

    for (let i = 0; i < roleUniversities.length; i++) {
      const universitiesInThisRole = roleUniversities[i].universities

      universitiesInThisRole?.map((university: any) =>
        ids.push(university.university_id)
      )
    }

    const universitiesIds = ids.reduce(
      (acc, cur) => (acc.includes(cur) ? acc : [...acc, cur]),
      []
    )

    return universitiesIds?.map((id: any) =>
      universities.find(university => university.university_id === id)
    )
  }

  return []
}

const Season = forwardRef((_props, ref) => {
  const user = useSelector<RootState, UserState>(({ user }) => user)
  const universities = useSelector<RootState, UniversitiesState>(
    ({ universities }) => universities
  )

  const universitiesToSeason = getAllUniversitiesOfUser(user, universities)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUniversities(universities))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Style ref={ref as any}>
      <header>
        <h1>Temporadas</h1>
      </header>

      <ul id='content'>
        {universitiesToSeason.length !== 0 ? (
          universitiesToSeason.map(
            (university: UniversityType) =>
              university &&
              university.name && (
                <University key={university.name} university={university} />
              )
          )
        ) : (
          <div id='notLinked'>
            <h2>Você não está vinculado a nenhuma universidade.</h2>
            <p>Cadastre um papel que vincule a alguma!</p>
          </div>
        )}
      </ul>
    </Style>
  )
})

export default Season
