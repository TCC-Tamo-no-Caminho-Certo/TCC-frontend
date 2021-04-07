import React, { useContext, useEffect, useRef, useState } from 'react'
import Style from './styles'

import { ItemData } from '../..'

import makeRoleLabel from 'utils/makeRoleLabel'

import { Response, RootState } from 'store'
import { Role } from 'store/roles'
import { CoursesState } from 'store/courses'

import CloseIcon from 'assets/Inputs/CloseIcon'
import CheckboxIcon, { CheckboxIconMethods } from 'assets/CheckboxIcon'

import Popup, { PopupMethods } from 'components/Popup'
import Avatar from 'components/User/Avatar'
import Form, { Submit, Textarea } from 'components/Form'
import DotsLoader from 'components/DotsLoader'

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
  const courses = useSelector<RootState, CoursesState>(state => state.courses)
  const acceptRef = useRef<CheckboxIconMethods>(null)
  const rejectRef = useRef<CheckboxIconMethods>(null)
  const popupRef = useRef<PopupMethods>(null)
  const [buttonClicked, setButtonClicked] = useState('rejected')
  const theme = useContext(ThemeContext)

  const afterResponseSubmit = (res: Response<any>) => {
    res.success
      ? popupRef.current?.configPopup({
          type: 'success',
          message: 'Resposta enviada.',
          onClick: onCloseClick
        })
      : popupRef.current?.configPopup({
          type: 'error',
          message: 'Ops, algo deu errado :(',
          onClick: onCloseClick
        })
  }

  useEffect(() => {
    console.log('tst4', selectedInfo)
  }, [selectedInfo])

  return (
    <>
      <Style role={selectedInfo?.role} status={selectedInfo?.statusCircle}>
        {userInfo && selectedInfo ? (
          <>
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
                <div>
                  {
                    courses.courses.find(
                      course => course.course_id === selectedInfo?.course_id
                    )?.name
                  }
                </div>
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
              <div id='pretext'>
                Justificativa:
                <p>{selectedInfo?.pretext}</p>
              </div>
            )}
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
                  <label
                    htmlFor='accept'
                    onClick={() => {
                      acceptRef.current?.changeCheck(true)
                      rejectRef.current?.changeCheck(false)
                    }}
                  >
                    <CheckboxIcon ref={acceptRef} />
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
                afterResData={afterResponseSubmit}
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

                <Submit>Enviar resposta</Submit>
              </Form>
            </>
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
        bgHeight={'100vh'}
        ref={popupRef}
        zIndex={20}
      />
    </>
  )
}

export default ResponseContent
