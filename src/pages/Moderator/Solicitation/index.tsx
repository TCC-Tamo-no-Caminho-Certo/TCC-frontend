import React, { useEffect } from 'react'
import Style from './styles'

import Table from './Table'

import { getRoles, RolesState } from 'store/roles'
import { RootState } from 'store'
import { CoursesState, getCourses } from 'store/courses'

import { useDispatch, useSelector } from 'react-redux'

const Solicitation = () => {
  const dispatch = useDispatch()
  const roles = useSelector<RootState, RolesState>(state => state.roles)
  const courses = useSelector<RootState, CoursesState>(state => state.courses)

  useEffect(() => {
    dispatch(getRoles(roles))
    dispatch(getCourses(courses))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Style>
      <header>
        <h1>Solicitações</h1>
      </header>

      <Table />
    </Style>
  )
}

export default Solicitation
