import React, {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useState
} from 'react'
import Style, { Content, Header } from './styles'

import RequestSvg from './RequestSvg'
import ProfessorForm from '../ProfessorForm'
import StudentForm from '../StudentForm'
import ModeratorForm from '../ModeratorForm'
import StudentChange from '../StudentChange'

import { StatusTypes } from 'utils/status'
import makeRoleLabel from 'utils/makeRoleLabel'

import api from 'services/api'

import { RootState } from 'store'
import { getRoles, Role, RolesState } from 'store/AsyncThunks/roles'
import {
  getUniversities,
  UniversitiesState,
  University
} from 'store/AsyncThunks/universities'
import { Course, CoursesState, getCourses } from 'store/AsyncThunks/courses'

import { useDispatch, useSelector } from 'react-redux'

interface Request {
  created_at: string
  data: any
  feedback: string
  name: string
  request_id: number
  role: Role
  role_id: number
  status: StatusTypes
  updated_at: string
  user_id: number
}

interface ContainerProps {
  role?: string
}

interface ContainerState {
  inRequest: boolean
  request?: Request
}

interface Forms {
  student: JSX.Element
  professor: JSX.Element
  moderator: JSX.Element
}

interface ContainerContextState {
  storeUniversities: University[]
  storeCourses: Course[]
}

export const ContainerContext = createContext<ContainerContextState>({
  storeUniversities: [],
  storeCourses: []
})

const Container = forwardRef(({ role }: ContainerProps, ref) => {
  const roles = useSelector<RootState, RolesState>(({ roles }) => roles)
  const universities = useSelector<RootState, UniversitiesState>(
    ({ universities }) => universities
  )
  const courses = useSelector<RootState, CoursesState>(({ courses }) => courses)

  const [{ inRequest, request }, setContainerState] = useState<ContainerState>({
    inRequest: false,
    request: undefined
  })

  const dispatch = useDispatch()

  const makeRequest = useCallback(async () => {
    if (roles.roles.length !== 0) {
      const { requests } = await api.get('user/role/request')

      const roleId = roles.roles.find(storeRole => storeRole.title === role)
        ?.role_id

      const roleRequest = requests.find(
        (request: any) => request.role_id === roleId
      )

      roleRequest
        ? setContainerState({
            inRequest: true,
            request: roleRequest
          })
        : setContainerState({
            inRequest: false
          })
    }
  }, [role, roles])

  const forms: Forms = {
    student: request ? <StudentChange data={request.data} /> : <StudentForm />,
    professor: <ProfessorForm />,
    moderator: <ModeratorForm />
  }

  useEffect(() => {
    makeRequest()
  }, [makeRequest])

  useEffect(() => {
    dispatch(getRoles(roles))
    dispatch(getUniversities(universities))
    dispatch(getCourses(courses))

    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 100)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return role !== undefined ? (
    <Style ref={ref as any}>
      <Content role={role as Role}>
        <Header>
          {inRequest ? 'Acompanhar solicitação' : 'Solicitação de perfil'}
        </Header>

        <h4 id='role'>{makeRoleLabel(role as Role)}</h4>

        {inRequest && (
          <>
            <RequestSvg status={request?.status} />

            {request?.status === 'rejected' && (
              <div>
                <div id='rejected'>
                  <p>Solicitação rejeitada</p>

                  <div>
                    <span>Resposta do moderador:</span>
                    <p>{request?.feedback}</p>
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
            storeUniversities: universities.universities
          }}
        >
          {request?.status !== 'awaiting' && forms[role as keyof Forms]}
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
  ) : (
    <></>
  )
})

export default Container
