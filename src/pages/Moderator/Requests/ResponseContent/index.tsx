import React, { useContext, useRef, useState } from 'react'
import Style, { Field, Infos } from './styles'

import { getRoleLabel, getRoleName } from 'utils/roles'
import { isoToDate } from 'utils/dates'
import { getStatusLabel } from 'utils/status'

import api from 'services/api'

import { RolesState } from 'store/Async/roles'
import { Response, RootState } from 'store'
import { UserState } from 'store/Async/user'
import { CoursesState } from 'store/Async/courses'

import CloseIcon from 'assets/Inputs/CloseIcon'
import CheckboxIcon, { CheckboxIconMethods } from 'assets/CheckboxIcon'
import TrashIcon from 'assets/global/TrashIcon'

import Avatar from 'components/User/Avatar'
import Form, { Submit, Textarea } from 'components/Form'
import DotsLoader from 'components/DotsLoader'
import { ItemProps } from 'components/Table'

import { GlobalContext } from 'App'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import * as Yup from 'yup'

const ResponseContent = ({
  onCloseClick,
  userInfo,
  selectedInfo
}: ItemProps) => {
  const { roles } = useSelector<RootState, RolesState>(({ roles }) => roles)
  const user = useSelector<RootState, UserState>(({ user }) => user)
  const { courses } = useSelector<RootState, CoursesState>(
    ({ courses }) => courses
  )
  const theme = useContext(ThemeContext)
  const { popup } = useContext(GlobalContext)

  const acceptRef = useRef<CheckboxIconMethods>(null)
  const rejectRef = useRef<CheckboxIconMethods>(null)

  const [buttonClicked, setButtonClicked] = useState('rejected')

  const himselfModeratorRequest = user.user_id === userInfo?.user_id

  const onTrashClick = () => {
    selectedInfo &&
      popup?.popupRef?.current?.configPopup({
        type: 'warning',
        message: 'Tem certeza que deseja remover esta solicitação?',
        onOkClick: async () => {
          await api.delete(`user/role/request/${selectedInfo.request_id}`)
          onCloseClick()
        },
        onCloseClick: () => {
          popup?.popupRef?.current?.configPopup({
            setModal: false,
            message: '',
            type: 'warning'
          })
        }
      })
  }

  const afterResponseSubmit = (res: Response<any>) => {
    if (res.success)
      popup?.popupRef?.current?.configPopup({
        type: 'success',
        message: 'Resposta enviada.',
        onClick: onCloseClick
      })
    else
      switch (res.error) {
        case 'Request not found!':
          if (selectedInfo.status === 'Recusado')
            popup?.popupRef?.current?.configPopup({
              setModal: true,
              type: 'error',
              message: 'Solicitação já foi recusada.'
            })
          else
            popup?.popupRef?.current?.configPopup({
              setModal: true,
              type: 'error',
              message: 'Solicitação não encontrada ou já aceita.'
            })

          break

        default:
          popup?.popupRef?.current?.configPopup({
            type: 'error',
            message: 'Ops, algo deu errado :(',
            onClick: onCloseClick
          })
      }
  }

  return (
    <Style>
      {userInfo && selectedInfo ? (
        <>
          {!himselfModeratorRequest && (
            <motion.button id='delete' type='button' onClick={onTrashClick}>
              <TrashIcon />
              Excluir solicitação
            </motion.button>
          )}

          <CloseIcon onClick={onCloseClick} />

          <Infos
            status={selectedInfo.status}
            userRole={getRoleName(selectedInfo.role_id, roles)}
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
              <div id='role'>{getRoleLabel(selectedInfo.role_id, roles)}</div>
            </Field>

            <Field>
              Status:
              <div id='status'>{getStatusLabel(selectedInfo.status)}</div>
            </Field>

            {selectedInfo.data.linkedin && (
              <Field>
                Linkedin:
                <div>{selectedInfo.data.linkedin}</div>
              </Field>
            )}

            {selectedInfo.data.lattes && (
              <Field>
                Lattes:
                <div>{selectedInfo.data.lattes}</div>
              </Field>
            )}

            {selectedInfo.data.orcid && (
              <Field>
                Orcid:
                <div>{selectedInfo.data.orcid}</div>
              </Field>
            )}

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
                    courses.find(
                      ({ course_id }) =>
                        course_id === selectedInfo.data.course_id
                    )?.name
                  }
                </div>
              </Field>
            )}

            <Field>
              Data:
              <div>
                {isoToDate(selectedInfo.created_at, 'day/month/2-year')}
              </div>
            </Field>
          </Infos>

          {selectedInfo.voucherUrl ? (
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
                    ? `user/role/request/reject/${selectedInfo.request_id}`
                    : `user/role/request/accept/${selectedInfo.request_id}`
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
