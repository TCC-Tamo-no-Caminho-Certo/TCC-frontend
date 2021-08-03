import React, { useContext, useRef, useState } from 'react'
import Style, { Field, Infos } from './styles'

import { isoToDate } from 'utils/dates'
import { getStatusLabel } from 'utils/status'

import api from 'services/api'

import { RootState } from 'store'
import { AsyncUserState } from 'store/Async/user'

import CloseIcon from 'assets/global/CloseIcon'
import CheckboxIcon, { CheckboxIconMethods } from 'assets/CheckboxIcon'
import TrashIcon from 'assets/global/TrashIcon'

import Avatar from 'components/User/Avatar'
import Form, { Submit, Textarea } from 'components/Form'
import DotsLoader from 'components/DotsLoader'

import { GlobalContext } from 'App'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'
import * as Yup from 'yup'

export interface ItemProps {
  resetTable: () => void
  onCloseClick: () => void
  data?: any
}

const ResponseContent = ({ data, resetTable, onCloseClick }: ItemProps) => {
  const { user } = useSelector<RootState, AsyncUserState>(
    ({ asyncUser }) => asyncUser
  )
  const { popupRef } = useContext(GlobalContext)
  const theme = useContext(ThemeContext)

  const acceptRef = useRef<CheckboxIconMethods>(null)
  const rejectRef = useRef<CheckboxIconMethods>(null)

  const [buttonClicked, setButtonClicked] = useState('rejected')

  const himselfModeratorRequest = user?.id === data?.user_id

  const onTrashClick = () => {
    data &&
      popupRef?.current?.configPopup({
        type: 'warning',
        message: 'Tem certeza que deseja remover esta solicitação?',
        onOkClick: async () => {
          await api.delete(`user/role/request/${data?.request_id}`)
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
          if (data?.status === 'Recusado')
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

          <Infos status={data?.status} userRole={data?.role}>
            <div id='title'>Informações</div>

            <hr />

            <Field id='avatar'>
              <Avatar size={120} avatarId={data?.avatar_uuid} />
            </Field>

            <Field>
              Nome:
              <div>{data?.name}</div>
            </Field>

            <Field>
              Papel:
              <div id='role'>{data?.role}</div>
            </Field>

            <Field>
              Status:
              <div id='status'>{getStatusLabel(data?.status)}</div>
            </Field>

            {data?.data?.linkedin && (
              <Field>
                Linkedin:
                <div>{data?.data?.linkedin}</div>
              </Field>
            )}

            {data?.data?.lattes && (
              <Field>
                Lattes:
                <div>{data?.data?.lattes}</div>
              </Field>
            )}

            {data?.data?.orcid && (
              <Field>
                Orcid:
                <div>{data?.data?.orcid}</div>
              </Field>
            )}

            <Field>
              Email:
              <div>
                {data?.emails?.filter(({ main }: any) => main)[0].address}
              </div>
            </Field>

            {data?.role !== 'moderator' && data?.data?.course_id && (
              <Field>
                Curso:
                <div>CURSO</div>
              </Field>
            )}

            <Field>
              Data:
              <div>{isoToDate(data?.created_at, 'day/month/2-year')}</div>
            </Field>
          </Infos>

          {data?.voucher_uuid ? (
            <div id='doc'>
              <iframe src={data?.voucherUrl} frameBorder='0' />
            </div>
          ) : (
            <></>
          )}

          {data?.data?.pretext ? (
            <div id='pretext'>
              Justificativa:
              <p>{data?.data?.pretext}</p>
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
                    ? `user/role/request/reject/${data?.request_id}`
                    : `user/role/request/accept/${data?.request_id}`
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
