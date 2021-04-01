import React, { useRef, useState } from 'react'
import Style from './styles'

import { ItemData } from '../..'

import makeRoleLabel from 'utils/makeRoleLabel'

import { Role } from 'store/roles'

import CloseIcon from 'assets/Inputs/CloseIcon'

import Popup, { PopupMethods } from 'components/Popup'
import Avatar from 'components/User/Avatar'
import Form, { Submit, Textarea } from 'components/Form'

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
  const popupRef = useRef<PopupMethods>(null)
  const [buttonClicked, setButtonClicked] = useState('rejected')

  const onResponseSubmit = (res: any) => {
    if (res.success)
      popupRef.current?.configPopup({
        type: 'success',
        message: 'Resposta enviada',
        onClick: onCloseClick
      })
    else
      popupRef.current?.configPopup({
        type: 'error',
        message: 'Algo deu errado',
        onClick: onCloseClick
      })
  }

  return (
    <>
      <Style role={selectedInfo?.role} status={selectedInfo?.statusCircle}>
        <CloseIcon onClick={onCloseClick} />

        <div id='info'>
          <div id='title'>Informações</div>

          <hr />

          <div className='field' id='avatar'>
            <Avatar size={120} avatarId={userInfo?.avatar_uuid} />
          </div>

          <div className='field'>
            Nome:
            <div>{userInfo?.name}</div>
          </div>

          <div className='field'>
            Papel:
            <div id='role'>{makeRoleLabel(selectedInfo?.role as Role)}</div>
          </div>

          <div className='field'>
            Status:
            <div id='status'>{selectedInfo?.status}</div>
          </div>

          <div className='field'>
            Email:
            <div>
              {userInfo?.emails.filter(({ main }: any) => main)[0].address}
            </div>
          </div>

          <div className='field'>
            Curso:
            <div>Falta isso</div>
          </div>

          <div className='field'>
            Data:
            <div>{selectedInfo?.date}</div>
          </div>
        </div>

        {selectedInfo?.role === 'student' ? (
          <div id='doc'>
            <iframe src={selectedInfo?.voucherUrl} />
          </div>
        ) : (
          <div id='feedback'>
            Justificativa:
            <p>{selectedInfo?.feedback}</p>
          </div>
        )}

        {selectedInfo?.statusCircle === 'awaiting' && (
          <>
            <div id='radios'>
              <div>
                <input
                  name='response'
                  value='accept'
                  type='radio'
                  id='accept'
                  onChange={(e: any) => {
                    e.target.checked && setButtonClicked('accepted')
                  }}
                />
                <label htmlFor='accept' id='acceptLabel'>
                  Aceitar
                </label>
              </div>

              <div>
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
                <label htmlFor='reject' id='rejectLabel'>
                  Recusar
                </label>
              </div>
            </div>

            <Form
              loading
              method='patch'
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
              afterResData={onResponseSubmit}
              addDataToPath={[`${selectedInfo?.id}`]}
              path={
                buttonClicked === 'rejected'
                  ? 'user/role/request/reject/*%'
                  : 'user/role/request/accept/*%'
              }
            >
              <Textarea
                id='feedback'
                name='feedback'
                placeholder='Deixe uma resposta...'
                maxLength={500}
              />

              <Submit>Enviar resposta</Submit>
            </Form>
          </>
        )}
      </Style>

      <Popup
        bottom='50vh'
        translateY='50%'
        bgHeight={'100vh'}
        ref={popupRef}
        zIndex={20}
      />
    </>
  )
}

export default ResponseContent
