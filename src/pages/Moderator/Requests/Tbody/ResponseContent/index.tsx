import React, { useContext, useRef, useState } from 'react'
import Style, { Field, Infos } from './styles'

import { ItemData, RequestsContext } from '../..'

import makeRoleLabel from 'utils/makeRoleLabel'

import api from 'services/api'

import { Response, RootState } from 'store'
import { Role } from 'store/AsyncThunks/roles'
import { UserState } from 'store/user'

import CloseIcon from 'assets/Inputs/CloseIcon'
import CheckboxIcon, { CheckboxIconMethods } from 'assets/CheckboxIcon'
import TrashIcon from 'assets/global/TrashIcon'

import Popup, { PopupMethods } from 'components/Popup'
import Avatar from 'components/User/Avatar'
import Form, { Submit, Textarea } from 'components/Form'
import DotsLoader from 'components/DotsLoader'

import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import * as Yup from 'yup'

interface ResponseContentProps {
  userInfo?: any
  selectedInfo?: ItemData
  onCloseClick: () => void
}

function ResponseContent({
  onCloseClick,
  selectedInfo,
  userInfo
}: ResponseContentProps) {
  const user = useSelector<RootState, UserState>(state => state.user)
  const requestsContext = useContext(RequestsContext)
  const theme = useContext(ThemeContext)

  const acceptRef = useRef<CheckboxIconMethods>(null)
  const rejectRef = useRef<CheckboxIconMethods>(null)
  const popupRef = useRef<PopupMethods>(null)

  const [buttonClicked, setButtonClicked] = useState('rejected')

  const himselfModeratorRequest = user.user_id === userInfo?.user_id

  const afterResponseSubmit = (res: Response<any>) => {
    if (res.success)
      popupRef.current?.configPopup({
        type: 'success',
        message: 'Resposta enviada.',
        onClick: onCloseClick
      })
    else
      switch (res.error) {
        case 'Request not found!':
          if (selectedInfo?.status === 'rejected')
            popupRef.current?.configPopup({
              setModal: true,
              type: 'error',
              message: 'Solicitação já foi recusada.'
            })
          else
            popupRef.current?.configPopup({
              setModal: true,
              type: 'error',
              message: 'Solicitação não encontrada ou já aceita.'
            })

          break

        default:
          popupRef.current?.configPopup({
            type: 'error',
            message: 'Ops, algo deu errado :(',
            onClick: onCloseClick
          })
      }
  }

  return (
    <>
      <Style>
        {userInfo && selectedInfo ? (
          <>
            {!himselfModeratorRequest && (
              <motion.button
                id='delete'
                type='button'
                onClick={() => {
                  popupRef.current?.configPopup({
                    type: 'warning',
                    message: 'Tem certeza que deseja remover esta solicitação?',
                    onOkClick: async () => {
                      await api.delete(`user/role/request/${selectedInfo.id}`)
                      onCloseClick()
                    },
                    onCloseClick: () => {
                      popupRef.current?.configPopup({
                        setModal: false,
                        message: '',
                        type: 'warning'
                      })
                    }
                  })
                }}
              >
                <TrashIcon />
                Excluir solicitação
              </motion.button>
            )}

            <CloseIcon onClick={onCloseClick} />

            <Infos
              role={selectedInfo?.role}
              status={selectedInfo?.statusCircle}
            >
              <div id='title'>Informações</div>

              <hr />

              <Field id='avatar'>
                <Avatar size={120} avatarId={userInfo?.avatar_uuid} />
              </Field>

              <Field>
                Nome:
                <div>{userInfo?.name}</div>
              </Field>

              <Field>
                Papel:
                <div id='role'>{makeRoleLabel(selectedInfo?.role as Role)}</div>
              </Field>

              <Field>
                Status:
                <div id='status'>{selectedInfo?.status}</div>
              </Field>

              <Field>
                Linkedin:
                <div>{selectedInfo.linkedin}</div>
              </Field>

              <Field>
                Lattes:
                <div>{selectedInfo?.lattes}</div>
              </Field>

              <Field>
                Orcid:
                <div>{selectedInfo.orcid}</div>
              </Field>

              <Field>
                Email:
                <div>
                  {userInfo?.emails.filter(({ main }: any) => main)[0].address}
                </div>
              </Field>

              {selectedInfo.role !== 'moderator' && (
                <Field>
                  Curso:
                  <div>
                    {
                      requestsContext.courses.find(
                        course => course.course_id === selectedInfo?.course_id
                      )?.name
                    }
                  </div>
                </Field>
              )}

              <Field>
                Data:
                <div>{selectedInfo?.date}</div>
              </Field>
            </Infos>

            {selectedInfo?.role === 'student' ? (
              <div id='doc'>
                <iframe src={selectedInfo?.voucherUrl} />
              </div>
            ) : (
              <div id='pretext'>
                Justificativa:
                <p>{selectedInfo?.pretext}</p>
              </div>
            )}

            {!himselfModeratorRequest && (
              <>
                <div id='radios'>
                  <div id='radioAccept'>
                    <input
                      name='response'
                      value='accept'
                      type='radio'
                      id='accept'
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
                        secondary={theme.colors.primary}
                        primary={theme.colors.secondary}
                      />
                      Aceitar
                    </label>

                    <div className='wrapper' />
                  </div>

                  <div id='radioReject'>
                    <input
                      name='response'
                      value='reject'
                      type='radio'
                      id='reject'
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
                      ? `user/role/request/reject/${selectedInfo?.id}`
                      : `user/role/request/accept/${selectedInfo?.id}`
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

      <Popup
        bottom='50vh'
        translateY='50%'
        bgHeight='100vh'
        zIndex={20}
        ref={popupRef}
      />
    </>
  )
}

export default ResponseContent
