import React, { useContext, useEffect, useState } from 'react'
import Style, { Content, Header } from './styles'

import RequestSvg from './RequestSvg'
import Professor from '../Professor'
import ModeratorForm from '../Moderator'
import Student from '../Student'
import { AddRoleContext } from '../..'

import { StatusTypes } from 'utils/status'
import makeRoleLabel from 'utils/makeRoleLabel'

import api from 'services/api'

import { Role } from 'store/AsyncThunks/roles'

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
}

const Container = ({ role }: ContainerProps) => {
  const { roles } = useContext(AddRoleContext)
  const [request, setRequest] = useState<any>(undefined)

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
            roles.find(storeRole => storeRole.title === role)?.role_id
        )

        setRequest(filterByRole)
      })()

    return setRequest(undefined)
  }, [role, roles])

  return (
    <Style>
      <Content role={role}>
        <Header id='cy-follow'>
          {request ? 'Acompanhar solicitação' : 'Solicitação de perfil'}
        </Header>

        <h4 id='role'>{makeRoleLabel(role)}</h4>

        {request && (
          <>
            <RequestSvg status={request?.status} />

            {request?.status === 'rejected' && (
              <>
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
              </>
            )}
          </>
        )}

        {request?.status !== 'awaiting' && forms[role as keyof Forms]}

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
