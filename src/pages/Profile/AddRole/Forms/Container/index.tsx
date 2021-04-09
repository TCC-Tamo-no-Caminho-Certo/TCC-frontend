import React, { createContext, useEffect, useState } from 'react'
import Style, { Content, Header } from './styles'

import RequestSvg from './RequestSvg'
import ProfessorForm from '../ProfessorForm'
import ModeratorForm from '../ModeratorForm'
import Student from '../Student'

import { StatusTypes } from 'utils/status'
import makeRoleLabel from 'utils/makeRoleLabel'

import api from 'services/api'

import { RootState } from 'store'
import { getRoles, Role, RolesState, RoleType } from 'store/AsyncThunks/roles'
import {
  getUniversities,
  UniversitiesState,
  University
} from 'store/AsyncThunks/universities'
import { Course, CoursesState, getCourses } from 'store/AsyncThunks/courses'

import { useDispatch, useSelector } from 'react-redux'

interface Forms {
  student: JSX.Element
  professor: JSX.Element
  moderator: JSX.Element
}

export interface Data {
  register: string
  semester: number
  campus_id: number
  course_id: number
  university_id: number
}

interface Request {
  data: Data
  role: Role
  name: string
  role_id: number
  user_id: number
  feedback: string
  request_id: number
  updated_at: string
  created_at: string
  status: StatusTypes
}

interface ContainerContextState {
  storeCourses: Course[]
  storeRoles: RoleType[]
  storeUniversities: University[]
}

interface ContainerProps {
  role: Role
}

export const ContainerContext = createContext<ContainerContextState>({
  storeUniversities: [],
  storeCourses: [],
  storeRoles: []
})

const Container = ({ role }: ContainerProps) => {
  const courses = useSelector<RootState, CoursesState>(({ courses }) => courses)
  const roles = useSelector<RootState, RolesState>(({ roles }) => roles)
  const universities = useSelector<RootState, UniversitiesState>(
    ({ universities }) => universities
  )

  const [requests, setRequests] = useState<Request[] | undefined>(undefined)
  const selectedRequest = requests?.find(
    (request: any) =>
      request.role_id ===
      roles.roles.find(storeRole => storeRole.title === role)?.role_id
  )

  const dispatch = useDispatch()

  const forms = {
    student: <Student requests={requests} />,
    professor: <ProfessorForm />,
    moderator: <ModeratorForm />
  }

  useEffect(() => {
    if (roles.roles.length !== 0)
      (async () => {
        const { requests } = await api.get('user/role/request')
        setRequests(requests)
      })()
  }, [roles])

  useEffect(() => {
    dispatch(getRoles(roles))
    dispatch(getUniversities(universities))
    dispatch(getCourses(courses))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Style>
      <Content role={role}>
        <Header>
          {requests ? 'Acompanhar solicitação' : 'Solicitação de perfil'}
        </Header>

        <h4 id='role'>{makeRoleLabel(role)}</h4>

        {requests && (
          <>
            <RequestSvg status={selectedRequest?.status} />

            {selectedRequest?.status === 'rejected' && (
              <div>
                <div id='rejected'>
                  <p>Solicitação rejeitada</p>

                  <div>
                    <span>Resposta do moderador:</span>
                    <p>{selectedRequest?.feedback}</p>
                  </div>
                </div>

                <p id='tryAgain'>
                  Se quiser tente novamente alterando seus dados abaixo:
                </p>
              </div>
            )}
          </>
        )}

        <ContainerContext.Provider
          value={{
            storeCourses: courses.courses,
            storeUniversities: universities.universities,
            storeRoles: roles.roles
          }}
        >
          {requests && forms[role as keyof Forms]}
        </ContainerContext.Provider>

        <button
          id='scrollButton'
          type='button'
          onClick={() => window.scrollTo(0, 0)}
        >
          Escolher outro papel
        </button>
      </Content>
    </Style>
  )
}

export default Container
