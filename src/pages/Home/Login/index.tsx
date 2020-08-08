import React, { /* useContext */ useRef, useEffect, useState, useCallback } from 'react'
import Style, { /* ThemeSwitch */ Content, Register, Google, Permanence } from './styles'
// import { useTheme } from 'hooks/useTheme'
// import sun from 'assets/sun.svg'
// import Switch from 'react-switch'
// import { ThemeContext } from 'styled-components'
import loginSchema from 'validations/login'
import Button from 'components/Button'
import InputText from 'components/InputText/'
import { useAuth } from 'hooks/useAuth'
import { useRegisterSlide } from 'hooks/useRegisterSlide'
import getValidationErrors from 'utils/getValidationErrors'
import Logo from 'assets/Logo'
import google from 'assets/google.png'
import * as Yup from 'yup'
import anime from 'animejs'
import ReCAPTCHA from 'react-google-recaptcha'
import { Form } from '@unform/web'
import { useHistory } from 'react-router-dom'
import { FiUser, FiLock } from 'react-icons/fi'
import { SubmitHandler, FormHandles } from '@unform/core'

export interface LoginData {
  email: string
  password: string
  captcha: string
}

const Login: React.FC = () => {
  // const { themeState, setThemeState } = useTheme()
  // const themes = useContext(ThemeContext)
  const history = useHistory()
  const contentRef = useRef(null)
  const loginFormRef = useRef<FormHandles>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const { login } = useAuth()
  const { registerSlide, setRegisterSlide } = useRegisterSlide()
  const [showLogin, setShowLogin] = useState(true)
  const [disabled, setDisabled] = useState(true)

  const sliderAnimation = useCallback(() => {
    setDisabled(true)
    setTimeout(() => {
      setDisabled(false)
    }, 1000)

    if (registerSlide) {
      setTimeout(() => {
        setShowLogin(false)
      }, 1000)
    } else setShowLogin(true)
  }, [registerSlide])

  const startAnimation = () => {
    anime({
      targets: contentRef.current,
      translateX: [300, 0],
      translateY: [-10, 0],
      opacity: [0, 1],
      duration: 900,
      easing: 'easeInOutSine',
    })
  }

  useEffect(() => {
    sliderAnimation()
  }, [sliderAnimation])

  useEffect(() => {
    startAnimation()
  }, [])

  const onLoginSubmit: SubmitHandler<LoginData> = async (data, { reset }, event) => {
    event?.preventDefault()

    try {
      let captchaToken
      if (recaptchaRef.current) {
        captchaToken = await recaptchaRef.current.executeAsync()
      }

      await loginSchema.validate(data, { abortEarly: false })

      console.log('login:', { ...data, captcha: captchaToken })
      await login({ ...data, captcha: captchaToken as string })

      loginFormRef.current?.setErrors({})
      reset()
      history.push('/map')
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorList = getValidationErrors(error)
        loginFormRef.current?.setErrors(errorList)
      }
    }
  }

  const onSignupClick = () => {
    setRegisterSlide(true)
  }

  return (
    <>
      <ReCAPTCHA
        ref={recaptchaRef}
        size='invisible'
        sitekey='6LfC97YZAAAAANhOv1bglq0SOzU8WMjL2R64l1xD'
      />

      {showLogin && (
        <Style>
          {/* <ThemeSwitch>
            <label htmlFor='switch'>Darkmode</label>

            <Switch
              onChange={() => setThemeState(!themeState)}
              checked={themeState}
              offColor={themes.primary}
              offHandleColor={themes.secondary}
              onColor={themes.primary}
              onHandleColor={themes.secondary}
              uncheckedIcon={false}
              checkedIcon={false}
              height={18}
              width={35}
              id='switch'
            />

            <img src={sun} alt='theme switch' />
          </ThemeSwitch> */}

          <Content ref={contentRef}>
            <Logo />

            <Google>
              <img src={google} alt='google' />
              Entrar com o Google
            </Google>

            <Form ref={loginFormRef} onSubmit={onLoginSubmit}>
              <InputText name='email' placeholder='E-mail' icon={FiUser} size={23} />

              <InputText
                name='password'
                placeholder='Senha'
                icon={FiLock}
                size={23}
                type='password'
                eye
              />

              <Button type='submit'>Efetuar Login</Button>
            </Form>

            <Permanence htmlFor='permanence'>
              <input type='checkbox' id='permanence' />
              Permanecer conectado
            </Permanence>

            <Register>
              Ainda não possui uma conta ?
              <br />
              <button type='button' disabled={disabled} onClick={onSignupClick}>
                Registre-se aqui!
              </button>
            </Register>
          </Content>
        </Style>
      )}
    </>
  )
}

export default Login
