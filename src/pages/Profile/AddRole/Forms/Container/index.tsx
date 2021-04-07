import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import Style, { Content, Header } from './styles'

import RequestSvg from './RequestSvg'
import ModeratorForm from '../ModeratorForm'
import StudentForm from '../StudentForm'
import ProfessorForm from '../ProfessorForm'

import { StatusTypes } from 'utils/status'
import makeRoleLabel from 'utils/makeRoleLabel'

import api from 'services/api'

import { RootState } from 'store'
import { UserState } from 'store/user'
import { Role } from 'store/roles'

import { useSelector } from 'react-redux'

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

const Container = forwardRef(({ role }: ContainerProps, ref) => {
  const [{ inRequest, request }, setContainerState] = useState<ContainerState>({
    inRequest: false,
    request: undefined
  })
  const user = useSelector<RootState, UserState>(state => state.user)

  const makeRequest = useCallback(async () => {
    const { requests } = await api.get(
      `user/role/requests?per_page=1&filter[user_id][]=${user.user_id}`
    )

    if (requests) {
      const roleRequests = requests.filter(
        (request: any) => request.role === role
      )

      if (roleRequests[0])
        setContainerState({
          inRequest: true,
          request: roleRequests[0]
        })
      else
        setContainerState({
          inRequest: false
        })
    }
  }, [user, role])

  useEffect(() => {
    makeRequest()
  }, [makeRequest])

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 100)
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

            {request?.status === 'rejected' ? (
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
            ) : (
              <></>
            )}
          </>
        )}

        {role === 'student' && <StudentForm beforeData={request?.data} />}
        {role === 'professor' && <ProfessorForm beforeData={request?.data} />}
        {role === 'moderator' && <ModeratorForm beforeData={request?.data} />}

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
