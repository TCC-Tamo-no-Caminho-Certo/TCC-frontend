import React, {useRef, useEffect} from "react"
import Style from "./styles"
import validation from "./validation"
import InputText from "components/Form/InputText"
import {ButtonPrimary} from "components/Form/Button"
import FlexBox from "components/FlexBox"
import CheckBox from "components/Form/CheckBox"
import Select from "components/Form/Select"
import useRegister from "store/useRegister"
import api from "services/api"
import x from "assets/x.svg"
import {Form} from "@unform/web"
import * as Yup from "yup"
import anime from "animejs"

const roles = [
  {value: "student", label: "Estudante"},
  {value: "professor", label: "Professor"},
  {value: "client", label: "Cliente"},
]

export default function SignUp() {
  const signUpRef = useRef(null)
  const {register, setRegister} = useRegister()

  useEffect(() => {
    if (register !== "starting") {
      anime({
        targets: "#signUp",
        duration: 1000,
        easing: "easeInOutCirc",
        translateX: register ? [0, "-100%"] : ["-100%", 0],
      })
    }
  }, [register])

  async function onSignUpSubmit(data, {reset}) {
    try {
      const schema = Yup.object().shape(validation)
      await schema.validate(data, {
        abortEarly: false,
      })
      console.log(data)
      await api.post(`register`, data)
      setRegister("starting")
      signUpRef.current.setErrors({})
      reset()
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorList = {}
        error.inner.forEach((errorElement) => {
          errorList[errorElement.path] = errorElement.message
        })
        signUpRef.current.setErrors(errorList)
      } else console.log(error)
    }
  }

  return (
    <Style as="section" id="signUp">
      <div id="x">
        <FlexBox
          row
          onClick={() => {
            signUpRef.current.setErrors({})
            signUpRef.current.reset()
            setRegister(!register)
          }}
        >
          <span>Fechar</span>
          <img src={x} alt="fechar cadastrar" />
        </FlexBox>
      </div>

      <span id="welcome">Bem-vindo ao Aris</span>
      <Form ref={signUpRef} onSubmit={onSignUpSubmit}>
        <FlexBox>
          <FlexBox id="row">
            <FlexBox id="col1">
              <InputText name="name" placeholder="Nome" />
              <InputText name="sur_name" placeholder="Sobrenome" />
              <InputText name="email" placeholder="E-mail" />
              <InputText name="confirmEmail" placeholder="Confirmar e-mail" />
              <InputText name="password" placeholder="Senha" />
              <InputText name="confirmPassword" placeholder="Confirmar senha" />
            </FlexBox>
            <FlexBox id="col2">
              <Select name="country" options={roles} isSearchable />
              <Select name="state" options={roles} isSearchable />
              <Select name="city" options={roles} isSearchable />
              <InputText name="address" placeholder="Endereço" />
              <InputText name="number" placeholder="Número" />
              <InputText name="zip_code" placeholder="CEP" />
            </FlexBox>
          </FlexBox>

          <Select name="role" options={roles} />
          <CheckBox name="policy">
            Aceito as <strong>Politicas de Privacidade</strong>
          </CheckBox>
          <CheckBox name="terms">
            Aceito os <strong>Termos de uso</strong>
          </CheckBox>
        </FlexBox>
        <ButtonPrimary type="submit">Concluir Cadastro</ButtonPrimary>
      </Form>
    </Style>
  )
}
