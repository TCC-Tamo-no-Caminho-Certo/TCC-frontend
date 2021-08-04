import React, { useContext, useEffect, useRef, useState } from 'react'
import Style, { Field, Infos } from './styles'

import api from 'services/api'

import { RootState } from 'store'
import { AsyncUserState } from 'store/Async/user'

import CloseIcon from 'assets/global/CloseIcon'
import CheckboxIcon, { CheckboxIconMethods } from 'assets/CheckboxIcon'
import TrashIcon from 'assets/global/TrashIcon'

import Avatar from 'components/User/Avatar'
import Form, { Submit, Textarea } from 'components/Form'
import DotsLoader from 'components/DotsLoader'

import { EmailsResType, EmailsType } from 'types/Responses/user/emails'

import { GlobalContext } from 'App'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import * as Yup from 'yup'

const ResponseContent = ({ data, resetTable, onCloseClick }: any) => {
  const { user } = useSelector<RootState, AsyncUserState>(
    ({ asyncUser }) => asyncUser
  )
  const { popupRef } = useContext(GlobalContext)
  const theme = useContext(ThemeContext)

  const acceptRef = useRef<CheckboxIconMethods>(null)
  const rejectRef = useRef<CheckboxIconMethods>(null)

  const selectedData = data?.selectedData
  const normalData = data?.data

  const [buttonClicked, setButtonClicked] = useState('rejected')

  const himselfModeratorRequest = user?.id === selectedData?.user.id

  const [emails, setEmails] = useState<EmailsType>()

  const onTrashClick = () => {
    data &&
      popupRef?.current?.configPopup({
        type: 'warning',
        message: 'Tem certeza que deseja remover esta solicitação?',
        onOkClick: async () => {
          await api.delete(`user/role/request/${selectedData?.request.id}`)
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
          if (data?.data.status === 'rejected')
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
      const { emails }: EmailsResType = await api.get(
        `users/${selectedData?.user.id}/emails`
      )

      setEmails(emails)
    })()
  }, [selectedData?.user.id])

  return (
    <Style>
      {data ? (
        <>
          {!himselfModeratorRequest && (
            <motion.button id='delete' type='button' onClick={onTrashClick}>
              <TrashIcon />
              Excluir solicitação
            </motion.button>
          )}

          <CloseIcon onClick={onCloseClick} />

          <Infos status={normalData?.status} userRole={normalData?.role}>
            <div id='title'>Informações</div>

            <hr />

            <Field id='avatar'>
              <Avatar size={120} avatarId={selectedData?.user.avatar_uuid} />
            </Field>

            <Field>
              Nome:
              <div>{selectedData?.user.full_name}</div>
            </Field>

            <Field>
              Papel:
              <div id='role'>{normalData?.role}</div>
            </Field>

            <Field>
              Status:
              <div id='status'>{normalData?.status}</div>
            </Field>

            {selectedData?.request.data.linkedin && (
              <Field>
                Linkedin:
                <div>{selectedData?.request.data.linkedin}</div>
              </Field>
            )}

            {selectedData?.request.data.lattes && (
              <Field>
                Lattes:
                <div>{selectedData?.request.data.lattes}</div>
              </Field>
            )}

            {selectedData?.request.data.orcid && (
              <Field>
                Orcid:
                <div>{selectedData?.request.data.orcid}</div>
              </Field>
            )}

            <Field>
              Email:
              <div>{emails?.filter(({ main }: any) => main)[0]?.address}</div>
            </Field>

            {normalData?.role !== 'moderator' &&
              selectedData?.request.data.course_id && (
                <Field>
                  Curso:
                  <div>CURSO</div>
                </Field>
              )}

            <Field>
              Data:
              <div>{selectedData?.request.created_at}</div>
            </Field>
          </Infos>

          {selectedData?.request.data.voucher_uuid ? (
            <div id='doc'>
              <iframe
                src={selectedData?.request.data.voucher_uuid}
                frameBorder='0'
              />
            </div>
          ) : (
            <></>
          )}

          {selectedData?.request.data.pretext ? (
            <div id='pretext'>
              Justificativa:
              <p>{selectedData?.request.data.pretext}</p>
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
                    ? `user/role/request/reject/${selectedData?.request.id}`
                    : `user/role/request/accept/${selectedData?.request.id}`
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
