import React, { useContext, useEffect, useRef, useState } from 'react'
import Style, { Field, Infos } from './styles'

import { StatusTypes } from 'utils/status'

import api from 'services/api'

import { RootState } from 'store'
import { AsyncUserState } from 'store/Async/user'

import CloseIcon from 'assets/global/CloseIcon'
import CheckboxIcon, { CheckboxIconMethods } from 'assets/CheckboxIcon'
import TrashIcon from 'assets/global/TrashIcon'

import Avatar from 'components/User/Avatar'
import Form, { Submit, Textarea } from 'components/Form'
import DotsLoader from 'components/DotsLoader'
import { BodyRowType } from 'components/Table'

import { EmailsResType, EmailsType } from 'types/Responses/user/emails'
import { RoleType } from 'types/Responses/user/roles'
import { CourseResType } from 'types/Responses/university/courses'

import { GlobalContext } from 'App'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import * as Yup from 'yup'

interface ResponseContentProps {
  data: BodyRowType
  resetTable: () => void
  onCloseClick: () => void
}

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

  const acceptRef = useRef<CheckboxIconMethods>(null)
  const rejectRef = useRef<CheckboxIconMethods>(null)

  const [buttonClicked, setButtonClicked] = useState('rejected')
  const [aditionalData, setAditionalData] =
    useState<{ emails: EmailsType; course: string; voucherUrl?: string }>()

  const himselfModeratorRequest = user?.id === data.rowValue.user?.id

  const onTrashClick = () => {
    data &&
      popupRef?.current?.configPopup({
        type: 'warning',
        message: 'Tem certeza que deseja remover esta solicitação?',
        onOkClick: async () => {
          await api.delete(`user/role/request/${data.rowValue.request?.id}`)
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
      const universityId = data.rowValue.request.data.university_id
      const campusId = data.rowValue.request.data.campus_id
      const courseId = data.rowValue.request.data.course_id
      const voucherId = data.rowValue.request.data.voucher_uuid

      const { emails }: EmailsResType = await api.get(
        `users/${data.rowValue.user?.id}/emails`
      )

      // const { course }: CourseResType = await api.get(
      //   `/universities/${universityId}/campus/${campusId}/courses/${courseId}`
      // )

      const course = { name: 'Engenharia da Computação' }
      if (voucherId) {
        const { url } = await api.get(
          `users/roles/requests/voucher/${voucherId}`
        )

        voucherUrl = url
      }

      console.log(data)
      setAditionalData({ emails, course: course.name, voucherUrl })
    })()
  }, [data])

  return (
    <Style>
      <CloseIcon onClick={onCloseClick} />

      {data ? (
        <>
          {!himselfModeratorRequest && (
            <motion.button id='delete' type='button' onClick={onTrashClick}>
              <TrashIcon />
              Excluir solicitação
            </motion.button>
          )}

          <Infos
            status={data.rowLabel.status.name as StatusTypes}
            userRole={data.rowLabel.role.name as RoleType}
          >
            <div id='title'>Informações</div>

            <hr />

            <Field id='avatar'>
              <Avatar size={120} avatarId={data.rowValue.user?.avatar_uuid} />
            </Field>

            <Field>
              Nome:
              <div>{data.rowValue.user?.full_name}</div>
            </Field>

            <Field>
              Papel:
              <div id='role'>{data.rowLabel.role.label}</div>
            </Field>

            <Field>
              Status:
              <div id='status'>{data.rowLabel.status.label}</div>
            </Field>

            {data.rowValue.request?.data.linkedin && (
              <Field>
                Linkedin:
                <div>{data.rowValue.request?.data.linkedin}</div>
              </Field>
            )}

            {data.rowValue.request?.data.lattes && (
              <Field>
                Lattes:
                <div>{data.rowValue.request?.data.lattes}</div>
              </Field>
            )}

            {data.rowValue.request?.data.orcid && (
              <Field>
                Orcid:
                <div>{data.rowValue.request?.data.orcid}</div>
              </Field>
            )}

            <Field>
              Email:
              <div>
                {
                  aditionalData?.emails?.filter(({ main }: any) => main)[0]
                    ?.address
                }
              </div>
            </Field>

            {data.rowLabel.role.name !== 'moderator' &&
              data.rowValue.request?.data.course_id && (
                <Field>
                  Curso:
                  <div>{aditionalData?.course}</div>
                </Field>
              )}

            <Field>
              Data:
              <div>{data.rowLabel.date.label}</div>
            </Field>
          </Infos>

          {aditionalData?.voucherUrl ? (
            <div id='doc'>
              <iframe src={aditionalData?.voucherUrl} frameBorder='0' />
            </div>
          ) : (
            <></>
          )}

          {data.rowValue.request?.data.pretext ? (
            <div id='pretext'>
              Justificativa:
              <p>{data.rowValue.request?.data.pretext}</p>
            </div>
          ) : (
            <></>
          )}

          {!himselfModeratorRequest && (
            <>
              <div id='radios'>
                <div id='radioAccept'>
                  <input
                    id='accept'
                    type='radio'
                    value='accept'
                    name='response'
                    onChange={(e: any) => {
                      e.target.checked && setButtonClicked('accepted')
                    }}
                  />

                  <label
                    htmlFor='accept'
                    onClick={() => {
                      acceptRef.current?.changeCheck(true)
                      rejectRef.current?.changeCheck(false)
                    }}
                  >
                    <CheckboxIcon
                      ref={acceptRef}
                      primary={theme.colors.secondary}
                      secondary={theme.colors.primary}
                    />
                    Aceitar
                  </label>

                  <div className='wrapper' />
                </div>

                <div id='radioReject'>
                  <input
                    id='reject'
                    type='radio'
                    value='reject'
                    name='response'
                    defaultChecked
                    onChange={(e: any) => {
                      e.target.checked && setButtonClicked('rejected')
                    }}
                  />

                  <label
                    htmlFor='reject'
                    onClick={() => {
                      acceptRef.current?.changeCheck(false)
                      rejectRef.current?.changeCheck(true)
                    }}
                  >
                    <CheckboxIcon ref={rejectRef} />
                    Recusar
                  </label>

                  <div className='wrapper' />
                </div>
              </div>

              <Form
                loading
                method='patch'
                afterResData={afterResponseSubmit}
                schema={
                  buttonClicked === 'rejected'
                    ? Yup.object({
                        feedback: Yup.string().required(
                          'Ao recusar deve-se enviar uma justificativa'
                        )
                      })
                    : Yup.object({
                        feedback: Yup.string()
                      })
                }
                path={
                  buttonClicked === 'rejected'
                    ? `user/role/request/reject/${data.rowValue.request?.id}`
                    : `user/role/request/accept/${data.rowValue.request?.id}`
                }
              >
                <Textarea
                  id='feedback'
                  name='feedback'
                  placeholder='Deixe uma resposta...'
                  maxLength={500}
                />

                <Submit id='cy-submit'>Enviar resposta</Submit>
              </Form>
            </>
          )}
        </>
      ) : (
        <div id='dots'>
          <DotsLoader color={theme.colors.secondary} />
        </div>
      )}
    </Style>
  )
}

export default ResponseContent
