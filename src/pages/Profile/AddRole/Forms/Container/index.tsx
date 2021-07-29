import React, {
  forwardRef,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import Style, { Content, Header, Rejected, ScrollButton } from './styles'

import RequestSvg from './RequestSvg'
import ModeratorForm from '../Moderator'
import StudentProfessor from '../StudentProfessor'
import { AddRoleContext } from '../..'

import { getRoleLabel } from 'utils/roles'

import api from 'services/api'

import { UserState } from 'store/Async/user'
import { RootState } from 'store'

import useCombinedRefs from 'hooks/useCombinedRefs'

import { RoleType } from 'types/Responses/user/roles'
import { RequestsResType } from 'types/Responses/user/requests'

import { useSelector } from 'react-redux'

interface Forms {
  student: JSX.Element
  professor: JSX.Element
  moderator: JSX.Element
}

interface ContainerProps {
  role: RoleType
  rolesRef: RefObject<HTMLDivElement>
}

const Container = forwardRef<any, ContainerProps>(({ role, rolesRef }, ref) => {
  const { roles } = useContext(AddRoleContext)
  const user = useSelector<RootState, UserState>(({ user }) => user)

  const hereRef = useRef<HTMLDivElement>(null)

  const [request, setRequest] = useState<any>(undefined)

  const conbinedRefs = useCombinedRefs(ref, hereRef)

  const forms = {
    student: <StudentProfessor role='student' request={request} />,
    professor: <StudentProfessor role='professor' request={request} />,
    moderator: <ModeratorForm request={request} />
  }

  const onScrollButtonClick = () => {
    rolesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (roles.length !== 0)
      (async () => {
        const { requests }: RequestsResType = await api.get(
          `users/${user.id}/roles/requests`
        )

        setRequest(requests.find(request => request.role === role))
      })()

    return setRequest(undefined)
  }, [role, roles, user.id, user.roles])

  useEffect(() => {
    hereRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <Style ref={conbinedRefs}>
      <Content role={role}>
        <Header>
          {request ? 'Acompanhar solicitação' : 'Solicitação de perfil'}
        </Header>

        <h4 id='role'>{getRoleLabel(role)}</h4>

        {request && (
          <>
            <RequestSvg status={request?.status} />

            {request?.status === 'rejected' && (
              <Rejected>
                <div id='rejected'>Solicitação rejeitada</div>
                <div id='response'>Resposta do moderador:</div>
                <div id='feedback'>{request?.feedback}</div>
                <div id='tryAgain'>
                  Se quiser tente novamente alterando seus dados abaixo:
                </div>
              </Rejected>
            )}
          </>
        )}

        {request?.status !== 'awaiting' && forms[role as keyof Forms]}

        <ScrollButton onClick={onScrollButtonClick}>
          Escolher outro papel
        </ScrollButton>
      </Content>
    </Style>
  )
})

export default Container
