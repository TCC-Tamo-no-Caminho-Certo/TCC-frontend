import React, { Dispatch, SetStateAction, useRef } from 'react'
import Style, { Choose, Voucher } from './styles'

import { Animations, show } from '../../StudentProfessor/index'

import AlertIcon from 'assets/Inputs/AlertIcon'

import { File } from 'components/Form'
import RegisterEmail, { RegisterEmailForwardeds } from 'components/RegisterEmail'

import { UniversityType } from 'types/Responses/university'
import {
  ProfessorDataType,
  RequestType,
  StudentDataType
} from 'types/Responses/user/requests'

import { createPortal } from 'react-dom'

interface WaysProps {
  animations: Animations
  selectedUniversity: UniversityType
  setAnimations: Dispatch<SetStateAction<Animations>>
  setRegisterByEmail: Dispatch<SetStateAction<boolean>>
  request?: RequestType<StudentDataType> & RequestType<ProfessorDataType>
}

const Ways = ({
  request,
  animations,
  setAnimations,
  setRegisterByEmail,
  selectedUniversity
}: WaysProps) => {
  const registerEmailRef = useRef<RegisterEmailForwardeds>(null)

  const { id, name, regex } = selectedUniversity

  const onVoucherButtonClick = () =>
    setAnimations((prev: any) => ({ ...prev, voucher: true }))

  const onEmailButtonClick = () => {
    setAnimations((prev: any) => ({
      ...prev,
      submit: false,
      voucher: false
    }))

    registerEmailRef.current?.toggleRegister()
  }

  const onFileChange = () => {
    setAnimations(prev => ({ ...prev, submit: true }))
  }

  const onEmailSuccess = () => {
    setAnimations(prev => ({
      ...prev,
      ways: false,
      submit: true
    }))

    setRegisterByEmail(true)
  }

  return (
    <>
      <Style>
        <Choose
          exit='exit'
          animate='enter'
          variants={show}
          condition={animations.ways}
        >
          <span>Forma de registro</span>

          <div>
            <button type='button' onClick={onEmailButtonClick}>
              E-mail institucional
            </button>

            <button type='button' onClick={onVoucherButtonClick}>
              Enviar comprovante
            </button>
          </div>
        </Choose>

        <Voucher
          exit='exit'
          animate='enter'
          variants={show}
          condition={animations.voucher}
        >
          <p>
            <AlertIcon />
            {`
                  Este processo ${
                    request ? '' : 'é mais lento pois'
                  } requer confirmação de um
                `}
            <b id='moderator'>Moderador</b> de sua universidade. O formato do
            arquivo deve ser <b>PDF</b>.
          </p>

          <File
            guides
            bottom='50vh'
            name='voucher'
            tranlateY='50%'
            bgHeight='200vh'
            accept='application/pdf'
            label='Enviar comprovante'
            noCropper={true}
            onChange={onFileChange}
          />
        </Voucher>
      </Style>

      {createPortal(
        <RegisterEmail
          placeholder='E-mail institucional'
          title={name}
          addData={{ id }}
          ref={registerEmailRef}
          onSuccess={onEmailSuccess}
          regex={regex.email.student}
        />,
        document.getElementById('root') as Element
      )}
    </>
  )
}

export default Ways
