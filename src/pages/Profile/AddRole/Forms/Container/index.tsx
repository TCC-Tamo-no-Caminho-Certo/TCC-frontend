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
import Student from '../StudentProfessor'
import { AddRoleContext } from '../..'

import { StatusTypes } from 'utils/status'
import { getRoleLabel } from 'utils/roles'

import api from 'services/api'

import useCombinedRefs from 'hooks/useCombinedRefs'

import { RoleType } from 'types/Responses/user/roles'

interface Forms {
  student: JSX.Element
  professor: JSX.Element
  moderator: JSX.Element
}

export interface Request<DataType> {
  data: DataType
  role: RoleType
  name: string
  role_id: number
  user_id: number
  feedback: string
  request_id: number
  updated_at: string
  created_at: string
  status: StatusTypes
  voucher_uuid: string
}

interface ContainerProps {
  role: RoleType
  rolesRef: RefObject<HTMLDivElement>
}

const Container = forwardRef<any, ContainerProps>(({ role, rolesRef }, ref) => {
  const { roles } = useContext(AddRoleContext)

  const hereRef = useRef<HTMLDivElement>(null)

  const [request, setRequest] = useState<any>(undefined)

  const conbinedRefs = useCombinedRefs(ref, hereRef)

  const forms = {
    student: <Student request={request} role='student' />,
    professor: <Student request={request} role='professor' />,
    moderator: <ModeratorForm request={request} />
  }

  const onScrollButtonClick = () => {
    rolesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (roles.length !== 0)
      (async () => {
        const { requests } = await api.get('user/role/request')

        const filterByRole = requests?.find(
          (request: any) =>
            request.role === roles.find(userRole => userRole === role)
        )

        setRequest(filterByRole)
      })()

    return setRequest(undefined)
  }, [role, roles])

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
