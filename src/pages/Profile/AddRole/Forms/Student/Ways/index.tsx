import React, { Dispatch, SetStateAction, useRef } from 'react'
import Style, { Choose, Voucher } from './styles'

import { Animations, show } from '../index'

import AlertIcon from 'assets/Inputs/AlertIcon'

import { File } from 'components/Form'
import RegisterEmail, { RegisterEmailMethods } from 'components/RegisterEmail'

import { UniversityType } from 'types/Responses/university'

interface WaysProps {
  request: any
  animations: Animations
  selectedUniversity: UniversityType
  setAnimations: Dispatch<SetStateAction<Animations>>
  setRegisterByEmail: Dispatch<SetStateAction<boolean>>
}

const Ways = ({
  request,
  animations,
  setAnimations,
  selectedUniversity,
  setRegisterByEmail
}: WaysProps) => {
  const registerEmailRef = useRef<RegisterEmailMethods>(null)

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

      {!request && (
        <RegisterEmail
          placeholder='E-mail institucional'
          title={name}
          addData={{ id }}
          ref={registerEmailRef}
          onSuccess={onEmailSuccess}
          regex={regex.email.student}
          modal={{ translateY: '50%', bottom: '50vh' }}
        />
      )}
    </Style>
  )
}

export default Ways
