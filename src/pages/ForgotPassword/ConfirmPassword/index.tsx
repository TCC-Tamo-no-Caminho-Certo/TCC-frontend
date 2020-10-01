import React, { useState } from 'react'

import Logo from 'styles/Logo'
import Style from '../styles'

import { passwordSchema } from 'utils/validations/forgotPassword'

import { useSelector, RootState, ThemeState } from 'store'

import Modal, { ModalAttributes } from 'components/Modal'

import { Form, Input, Button } from 'components/Form'
import { useHistory } from 'react-router-dom'
import { FiLock } from 'react-icons/fi'

const ConfirmPassword: React.FC = () => {

  const [modalAttributes, setModalAttributes] = useState<ModalAttributes>({ visible: false })
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const history = useHistory()

  const path = window.location.pathname.split('/')
  // eslint-disable-next-line
  const token = path[2] || localStorage.getItem('reset-password-token')
  if (!token) throw new Error('No token provided')

  const handleModalOKClick = () => {
    setModalAttributes({ visible: false })
    history.push('/')
  }

  const handleResetPassSubmit =  (data: any) => {
    setModalAttributes({
      visible: true,
      title: 'Sucesso',
      message: 'Senha Alterada',
      color: '#13c47c',
    })
  }

  return (
    <>
      <Modal {...modalAttributes} onOKClick={handleModalOKClick} />
      <Style theme={theme}>
        <article>
          <header>
            <Logo />
          </header>

          <section>
            <Form cb={handleResetPassSubmit} valSchema={passwordSchema} path='reset-password' addData={{ token }} loaderFB captcha>
              <h2>Digite sua nova senha</h2>
              <Input
                name='password'
                type='password'
                placeholder='Senha'
                icon={FiLock}
                eye
              />
              <h2>Confirme sua nova senha</h2>
              <Input
                name='confirmPassword'
                type='password'
                placeholder='Confirmar senha'
                icon={FiLock}
                eye
              />

              <Button className='submit'>Redefinir</Button>
            </Form>
          </section>
        </article>
      </Style>
    </>
  )
}

export default ConfirmPassword
