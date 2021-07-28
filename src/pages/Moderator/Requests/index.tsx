import React, { useEffect } from 'react'
import Style from './styles'

import ResponseContent from './ResponseContent'

import { isoToDate } from 'utils/dates'

import { RootState } from 'store'
import { CoursesState, getCourses } from 'store/Async/courses'
import { UserState } from 'store/Async/user'

import Table, { HeaderData } from 'components/Table'

import { useDispatch, useSelector } from 'react-redux'

const headerData: HeaderData[] = [
  { name: 'status', label: '', circle: true },
  { name: 'name', label: 'Nome' },
  { name: 'role', label: 'Papel', role: true, indexer: 'role_id' },
  {
    name: 'created_at',
    label: 'Data',
    dataManipulation: data => isoToDate(data, 'day/month')
  }
]

const Requests = () => {
  const courses = useSelector<RootState, CoursesState>(({ courses }) => courses)
  const { roles } = useSelector<RootState, UserState>(({ user }) => user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCourses(courses))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Style>
      <header>
        <h1>Solicitações</h1>
      </header>

      <Table
        path='user/role/requests'
        headerData={headerData}
        itemContent={ResponseContent}
        condition={!!roles && !!courses}
        filters={{ from: true, name: true, role: true, status: true, to: true }}
      />
    </Style>
  )
}

export default Requests
