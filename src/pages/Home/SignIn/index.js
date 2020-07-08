import React, {useRef, useEffect} from "react"
import Style from "./styles"
import Logo from "./Logo"
import validation from "./validation"
import {useHistory} from "react-router-dom"
import {Form} from "@unform/web"
import * as Yup from "yup"
import anime from "animejs"
import ThemeSwitch from "components/ThemeSwitch"
import InputText from "components/Form/InputText"
import FlexBox from "components/FlexBox"
import {ButtonPrimary, ButtonSecondary} from "components/Form/Button"
import useRegister from "store/useRegister"
import api from "services/api"
import linkedin from "assets/linkedin.png"
import google from "assets/google.png"
import github from "assets/github.png"

export default function SignIn() {
  const signInRef = useRef(null)
  const {register, setRegister} = useRegister()
  let history = useHistory()

  useEffect(() => {
    anime({
      targets: "#signIn",
      duration: 1000,
      easing: "easeInOutCirc",
      translateX: ["100vw", 0],
    })
  }, [])

  useEffect(() => {
    if (register !== "starting") {
      anime({
        targets: "#signIn",
        duration: 1000,
        easing: "easeInOutCirc",
        translateX: register ? [0, "-70vw"] : ["-70vw", 0],
      })
    }
  }, [register])

  async function onSignInSubmit(data, {reset}) {
    try {
      const schema = Yup.object().shape(validation)
      await schema.validate(data, {
        abortEarly: false,
      })
      const response = await api.post("login", data)
      localStorage.setItem("JWT", response.data.sessionToken)
      signInRef.current.setErrors({})
      reset()
      history.push("/map")
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorList = {}
        error.inner.forEach(errorElement => {
          errorList[errorElement.path] = errorElement.message
        })
        signInRef.current.setErrors(errorList)
      } else {
        console.log(error)
      }
    }
  }

  return (
    <Style as="section" id="signIn">
      <ThemeSwitch />
      <FlexBox main>
        <Logo />
        <Form ref={signInRef} onSubmit={onSignInSubmit}>
          <InputText name="email" line="emailSignIn" placeholder="E-mail" />
          <InputText
            name="password"
            line="passwordSignIn"
            type="password"
            placeholder="Senha"
          />
          <FlexBox row id="other">
            <img src={linkedin} alt="linkedin" />
            <img src={google} alt="google" />
            <img src={github} alt="github" />
            <ButtonSecondary type="submit"> Entrar</ButtonSecondary>
          </FlexBox>
        </Form>
        <ButtonPrimary
          onClick={() =>
            register === "starting" ? setRegister(true) : setRegister(!register)
          }
        >
          Cadastrar
        </ButtonPrimary>
      </FlexBox>
    </Style>
  )
}
