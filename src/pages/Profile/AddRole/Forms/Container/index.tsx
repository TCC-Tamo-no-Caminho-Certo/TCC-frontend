import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react'
import Style, { Content, Header } from './styles'

import RequestStatus from './RequestStatus'

import { StatusTypes } from 'utils/status'
import makeRoleLabel from 'utils/makeRoleLabel'

import api from 'services/api'

import { RootState } from 'store'
import { UserState } from 'store/user'
import { Role } from 'store/roles'

import { useSelector } from 'react-redux'

interface ContainerProps {
  role: Role
  children: ReactNode
}

const Container = forwardRef(({ role, children }: ContainerProps, ref) => {
  const [showStatus, setShowStatus] = useState(false)
  const user = useSelector<RootState, UserState>(state => state.user)
  const [status, setStatus] = useState<StatusTypes>('awaiting')
  const [message, setMessage] = useState('')

  const makeRequest = useCallback(async () => {
    const { requests } = await api.get(
      `user/role/requests?per_page=1&filter[user_id][]=${user.user_id}`
    )

    if (requests) {
      const roleRequests = requests.filter(
        (request: any) => request.role === role
      )

      if (roleRequests[0]) {
        setShowStatus(!!roleRequests[0].status)
        setStatus(roleRequests[0].status)
        setMessage(roleRequests[0].feedback)
      }
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

  return showStatus ? (
    <RequestStatus role={role} status={status} message={message} />
  ) : (
    <Style ref={ref as any}>
      <Content role={role}>
        <Header>Solicitação de perfil</Header>

        <div id='role'>{makeRoleLabel(role)}</div>

        {children}

        <button
          id='scrollButton'
          type='button'
          onClick={() => window.scrollTo(0, 0)}
        >
          Remover solicitação
        </button>

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
})

export default Container
