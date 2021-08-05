import React, { useContext, useEffect, useRef, useState } from 'react'
import Style, { GeneralInfo, Header, Pretext, Radios, Voucher } from './styles'

import Field from './Field'
import Radio from './Radio'

import api from 'services/api'

import { RootState } from 'store'
import { AsyncUserState } from 'store/Async/user'

import CloseIcon from 'assets/global/CloseIcon'
import TrashIcon from 'assets/global/TrashIcon'
import { CheckboxIconMethods } from 'assets/CheckboxIcon'

import Avatar from 'components/User/Avatar'
import Form, { Submit, Textarea } from 'components/Form'
import DotsLoader from 'components/DotsLoader'
import { BodyRowType } from 'components/Table'
import Role from 'components/Role'

import { EmailsResType } from 'types/Responses/user/emails'
import { RoleType } from 'types/Responses/user/roles'
import { CourseResType } from 'types/Responses/university/courses'

import { GlobalContext } from 'App'
import { useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import * as Yup from 'yup'

interface ResponseContentProps {
  data: BodyRowType
  resetTable: () => void
  onCloseClick: () => void
}

interface AditionalDataState {
  email: string
  course: string
  voucherUrl?: string
}

const formSchema = (response?: 'rejected' | 'accepted') =>
  response === 'rejected'
    ? Yup.object({
        feedback: Yup.string().required(
          'Ao recusar deve-se enviar uma justificativa'
        )
      })
    : Yup.object({
        feedback: Yup.string()
      })

const ResponseContent = ({
  data,
  resetTable,
  onCloseClick
}: ResponseContentProps) => {
  const { popupRef } = useContext(GlobalContext)
  const theme = useContext(ThemeContext)
  const { user } = useSelector<RootState, AsyncUserState>(
    ({ asyncUser }) => asyncUser
  )

  const [aditionalData, setAditionalData] = useState<AditionalDataState>()
  const [response, setResponse] = useState<'accepted' | 'rejected'>()

  const acceptRef = useRef<CheckboxIconMethods>(null)
  const rejectRef = useRef<CheckboxIconMethods>(null)

  const userData = data.rowValue.user
  const requestData = data.rowValue.request?.data
  const himselfModeratorRequest = user?.id === userData?.id

  const formPath = () => {
    if (requestData?.id)
      return response === 'rejected'
        ? `user/role/request/reject/${requestData?.id}`
        : `user/role/request/accept/${requestData?.id}`
  }

  const onTrashClick = () => {
    data &&
      popupRef?.current?.configPopup({
        type: 'warning',
        message: 'Tem certeza que deseja remover esta solicitação?',
        onOkClick: async () => {
          await api.delete(`user/role/request/${requestData?.id}`)
          resetTable()
          onCloseClick()
        },
        onCloseClick: () => {
          popupRef?.current?.configPopup({
            setModal: false,
            message: '',
            type: 'warning'
          })
        }
      })
  }

  const afterResponseSubmit = (res: any) => {
    if (res.success)
      popupRef?.current?.configPopup({
        type: 'success',
        message: 'Resposta enviada.',
        onClick: onCloseClick
      })
    else
      switch (res.error) {
        case 'Request not found!':
          if (data.rowLabel.status.name === 'rejected')
            popupRef?.current?.configPopup({
              setModal: true,
              type: 'error',
              message: 'Solicitação já foi recusada.'
            })
          else
            popupRef?.current?.configPopup({
              setModal: true,
              type: 'error',
              message: 'Solicitação não encontrada ou já aceita.'
            })

          break

        default:
          popupRef?.current?.configPopup({
            type: 'error',
            message: 'Ops, algo deu errado :(',
            onClick: onCloseClick
          })
      }
  }

  useEffect(() => {
    ;(async () => {
      let voucherUrl
      let userCourse = ''
      let userEmails = ''

      const { id } = userData
      const { university_id, campus_id, course_id, voucher_uuid } = requestData

      if (id) {
        const { emails }: EmailsResType = await api.get(`users/${id}/emails`)

        userEmails = emails.filter(({ main }: any) => main)[0]?.address
      }

      if (university_id && campus_id && course_id) {
        const { course }: CourseResType = await api.get(
          `/universities/${university_id}/campus/${campus_id}/courses/${course_id}`
        )

        userCourse = course.name
      }

      if (voucher_uuid) {
        const { url } = await api.get(
          `users/roles/requests/voucher/${voucher_uuid}`
        )

        voucherUrl = url
      }

      setAditionalData({ email: userEmails, course: userCourse, voucherUrl })
    })()
  }, [requestData, userData])

  return (
    <Style>
      <Header>
        {!himselfModeratorRequest && (
          <button type='button' onClick={onTrashClick}>
            <TrashIcon />
            Excluir
          </button>
        )}

        <CloseIcon onClick={onCloseClick} />
      </Header>

      {data ? (
        <>
          <GeneralInfo>
            <Avatar size={120} avatarId={userData?.avatar_uuid} />

            <Field label='Nome:' value={userData?.full_name} />

            <Field
              label='Papel:'
              component={() => (
                <Role role={data.rowLabel.role.name as RoleType} />
              )}
            />

            <Field label='Status:' value={data.rowLabel.status.label} />

            {requestData?.linkedin && (
              <Field label='Linkedin:' value={requestData?.linkedin} />
            )}

            {requestData?.lattes && (
              <Field label='Lattes:' value={requestData?.lattes} />
            )}

            {requestData?.orcid && (
              <Field label='Orcid:' value={requestData?.orcid} />
            )}

            <Field label='Email:' value={aditionalData?.email} />

            {!!(
              data.rowLabel.role.name !== 'moderator' && requestData?.course_id
            ) && <Field value={aditionalData?.course} label='Curso' />}

            <Field label='Data:' value={data.rowLabel.date.label} />

            {requestData?.pretext && (
              <Pretext>
                Justificativa: <p>{requestData?.pretext}</p>
              </Pretext>
            )}
          </GeneralInfo>

          {aditionalData?.voucherUrl && (
            <Voucher>
              <iframe src={aditionalData?.voucherUrl} frameBorder='0' />
            </Voucher>
          )}

          <Radios>
            <Radio
              id='accept'
              name='response'
              label='Aceitar'
              ref={acceptRef}
              onChange={(e: any) => {
                acceptRef.current?.changeCheck(true)
                e.target.checked && setResponse('accepted')
                rejectRef.current?.changeCheck(false)
              }}
            />

            <Radio
              name='response'
              id='reject'
              label='Recusar'
              ref={rejectRef}
              onChange={(e: any) => {
                rejectRef.current?.changeCheck(true)
                e.target.checked && setResponse('rejected')
                acceptRef.current?.changeCheck(false)
              }}
            />
          </Radios>

          {!himselfModeratorRequest && (
            <Form
              loading
              method='patch'
              path={formPath()}
              schema={formSchema(response)}
              afterResData={afterResponseSubmit}
            >
              <Textarea
                id='feedback'
                name='feedback'
                placeholder='Deixe uma resposta...'
                maxLength={500}
              />

              <Submit>Enviar resposta</Submit>
            </Form>
          )}
        </>
      ) : (
        <DotsLoader color={theme.colors.secondary} />
      )}
    </Style>
  )
}

export default ResponseContent
