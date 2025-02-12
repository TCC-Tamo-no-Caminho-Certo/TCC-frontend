import React, { useContext, useEffect, useRef, useState } from 'react'
import Style, { GeneralInfo, Header, Pretext, Radios, Voucher } from './styles'

import Field from './Field'
import Radio from './Radio'

import api from 'services/api'

import { RootState } from 'store'
import { UserState } from 'store/Async/user'

import CloseIcon from 'assets/global/CloseIcon'
import TrashIcon from 'assets/global/TrashIcon'
import { CheckboxIconForwardeds } from 'assets/CheckboxIcon'

import Avatar from 'components/User/Avatar'
import Form, { Submit, Textarea } from 'components/Form'
import DotsLoader from 'components/DotsLoader'
import { BodyRowType } from 'components/Table'
import Role from 'components/Role'
import Popup, { PopupForwardeds } from 'components/Popup'

import { EmailsResType } from 'types/Responses/user/emails'
import { RoleType } from 'types/Responses/user/roles'
import { CourseResType } from 'types/Responses/university/courses'

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

const formSchema = (response?: 'reject' | 'accept') =>
  response === 'reject'
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
  const theme = useContext(ThemeContext)
  const { user } = useSelector<RootState, UserState>(({ user }) => user)

  const popupRef = useRef<PopupForwardeds>(null)

  const [aditionalData, setAditionalData] = useState<AditionalDataState>()
  const [response, setResponse] = useState<'accept' | 'reject'>()

  const acceptRef = useRef<CheckboxIconForwardeds>(null)
  const rejectRef = useRef<CheckboxIconForwardeds>(null)

  const userData = data.rowValue.user
  const requestId = data.rowValue.request.id
  const himselfModeratorRequest = user?.id === userData?.id
  const {
    orcid,
    lattes,
    pretext,
    linkedin,
    campus_id,
    course_id,
    voucher_uuid,
    university_id
  } = data.rowValue.request?.data

  const onTrashClick = () => {
    popupRef?.current?.configPopup({
      open: true,
      type: 'warning',
      message: 'Tem certeza que deseja remover esta solicitação?',
      confirmTitle: 'Sim',
      onOkClick: async () => {
        await api.delete(`api/users/roles/requests/${requestId}`)
        resetTable()

        popupRef.current?.configPopup({
          open: true,
          type: 'success',
          onClick: onCloseClick,
          message: 'Solicitação removida'
        })
      }
    })
  }

  const afterResponseSubmit = (res: any) => {
    if (res.success)
      popupRef?.current?.configPopup({
        open: true,
        type: 'success',
        message: 'Resposta enviada.',
        onClick: () => {
          resetTable()
          onCloseClick()
        }
      })
    else
      switch (res.error) {
        case 'Request not found!':
          if (data.rowLabel.status.name === 'rejected')
            popupRef?.current?.configPopup({
              open: true,
              type: 'error',
              message: 'Solicitação já foi recusada.'
            })
          else
            popupRef?.current?.configPopup({
              open: true,
              type: 'error',
              message: 'Solicitação não encontrada ou já respondida.'
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

      if (id) {
        const { emails }: EmailsResType = await api.get(
          `api/users/${id}/emails`
        )

        userEmails = emails.filter(({ main }: any) => main)[0]?.address
      }

      if (university_id && campus_id && course_id) {
        const { course }: CourseResType = await api.get(
          `api/universities/${university_id}/campus/${campus_id}/courses/${course_id}`
        )

        userCourse = course.name
      }

      if (voucher_uuid) {
        const { url } = await api.get(
          `api/users/roles/requests/voucher/${voucher_uuid}`
        )

        voucherUrl = url
      }

      setAditionalData({ email: userEmails, course: userCourse, voucherUrl })
    })()
  }, [campus_id, course_id, university_id, userData, voucher_uuid])

  return (
    <>
      <Style>
        <Header>
          {!himselfModeratorRequest && (
            <button type='button' onClick={onTrashClick} data-cy='Trash'>
              <TrashIcon />
              Excluir
            </button>
          )}

          <CloseIcon onClick={onCloseClick} />
        </Header>

        {data ? (
          <>
            <GeneralInfo status={data.rowLabel.status.name}>
              <Avatar size={120} avatarId={userData?.avatar_uuid} />

              <Field id='name' label='Nome' value={userData?.full_name} />

              <Field id='date' label='Data' value={data.rowLabel.date.label} />

              <Field id='email' label='Email' value={aditionalData?.email} />

              <Field
                id='status'
                label='Status'
                value={data.rowLabel.status.label}
              />

              {!!(data.rowLabel.role.name !== 'moderator' && course_id) && (
                <Field
                  id='course'
                  label='Curso'
                  value={aditionalData?.course}
                />
              )}

              <Field
                id='role'
                label='Papel'
                component={() => (
                  <Role role={data.rowLabel.role.name as RoleType} />
                )}
              />

              {linkedin && (
                <Field id='linkedin' label='Linkedin' value={linkedin} />
              )}

              {lattes && <Field id='lattes' label='Lattes' value={lattes} />}

              {orcid && <Field id='orcid' label='Orcid' value={orcid} />}

              {pretext && (
                <Pretext>
                  Justificativa <p>{pretext}</p>
                </Pretext>
              )}
            </GeneralInfo>

            {aditionalData?.voucherUrl && (
              <Voucher>
                <iframe src={aditionalData?.voucherUrl} frameBorder='0' />
              </Voucher>
            )}

            {!himselfModeratorRequest && (
              <Radios>
                <Radio
                  id='accept'
                  name='response'
                  label='Aceitar'
                  ref={acceptRef}
                  onChange={(e: any) => {
                    acceptRef.current?.changeCheck(true)
                    e.target.checked && setResponse('accept')
                    rejectRef.current?.changeCheck(false)
                  }}
                />

                <Radio
                  id='reject'
                  name='response'
                  label='Recusar'
                  ref={rejectRef}
                  onChange={(e: any) => {
                    rejectRef.current?.changeCheck(true)
                    e.target.checked && setResponse('reject')
                    acceptRef.current?.changeCheck(false)
                  }}
                />
              </Radios>
            )}

            {!himselfModeratorRequest && (
              <Form
                loading
                method='patch'
                schema={formSchema(response)}
                afterResData={afterResponseSubmit}
                path={`api/users/roles/requests/${requestId}/${response}`}
              >
                <Textarea
                  id='feedback'
                  maxLength={500}
                  name='feedback'
                  placeholder='Deixe uma resposta...'
                  textColors={{
                    focused: theme.colors.secondary,
                    unfocused: theme.colors.secondary
                  }}
                />

                <Submit>Enviar resposta</Submit>
              </Form>
            )}
          </>
        ) : (
          <DotsLoader color={theme.colors.secondary} />
        )}
      </Style>

      <Popup ref={popupRef} />
    </>
  )
}

export default ResponseContent
