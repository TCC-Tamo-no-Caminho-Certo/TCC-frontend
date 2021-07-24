import React, {
  forwardRef,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import Style, { Content, Header } from './styles'

import RequestSvg from './RequestSvg'
import Professor from '../Professor'
import ModeratorForm from '../Moderator'
import Student from '../Student'
import { AddRoleContext } from '../..'

import { StatusTypes } from 'utils/status'
import { getRoleLabel } from 'utils/roles'

import api from 'services/api'

import useCombinedRefs from 'hooks/useCombinedRefs'

import { Role } from 'types/Responses/user/roles'

interface Forms {
  student: JSX.Element
  professor: JSX.Element
  moderator: JSX.Element
}

export interface Request<DataType> {
  data: DataType
  role: Role
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
  role: Role
  rolesRef: RefObject<HTMLDivElement>
}

const Container = forwardRef<any, ContainerProps>(({ role, rolesRef }, ref) => {
  const { roles } = useContext(AddRoleContext)

  const hereRef = useRef<HTMLDivElement>(null)

  const [request, setRequest] = useState<any>(undefined)

  const conbinedRefs = useCombinedRefs(ref, hereRef)

  const forms = {
    student: <Student request={request} />,
    professor: <Professor request={request} />,
    moderator: <ModeratorForm request={request} />
  }

  useEffect(() => {
    if (roles.length !== 0)
      (async () => {
        const { requests } = await api.get('user/role/request')

        const filterByRole = requests?.find(
          (request: any) =>
            request.role_id ===
            roles.find(({ title }) => title === role)?.role_id
        )

        setRequest(filterByRole)
      })()

    return setRequest(undefined)
  }, [role, roles])

  useEffect(() => {
    hereRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <Style id='container' ref={conbinedRefs}>
      <Content role={role}>
        <Header id='cy-follow'>
          {request ? 'Acompanhar solicitação' : 'Solicitação de perfil'}
        </Header>

        <h4 id='role'>{getRoleLabel(role)}</h4>

        {request && (
          <>
            <RequestSvg status={request?.status} />

            {request?.status === 'rejected' && (
              <div>
                <div id='rejected'>
                  <p>Solicitação rejeitada</p>

                  <div id='feedback'>
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

        {request?.status !== 'awaiting' && forms[role as keyof Forms]}

        <button
          id='scrollButton'
          type='button'
          onClick={() =>
            rolesRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Escolher outro papel
        </button>
      </Content>
    </Style>
  )
})

export default Container
