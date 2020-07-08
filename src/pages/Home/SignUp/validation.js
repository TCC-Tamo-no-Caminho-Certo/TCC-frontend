import * as Yup from "yup"

const validation = {
  email: Yup.string()
    .email("Por favor digite um e-mail válido ")
    .required("Você esqueceu do e-mail!"),
  confirmEmail: Yup.string()
    .email("Por favor digite um e-mail válido ")
    .required("Você esqueceu de confirmar o e-mail!")
    .oneOf([Yup.ref("email"), null], "Confirmação de e-mail incorreta!"),
  name: Yup.string().required("É necessário que informe seu nome!"),
  sur_name: Yup.string().required("É necessário que informe seu sobrenome!"),
  password: Yup.string()
    .min(6, "Sua senha deve conter mais de 6 caracteres")
    .required("Você esqueceu da senha!"),
  confirmPassword: Yup.string()
    .required("Você esqueceu de confirmar a senha!")
    .min(6, "Sua senha deve conter mais de 6 caracteres")
    .oneOf([Yup.ref("password"), null], "Confirmação de senha incorreta!"),
  terms: Yup.boolean().oneOf([true], "Você precisa aceitar para continuar!"),
  policy: Yup.boolean().oneOf([true], "Você precisa aceitar para continuar!"),
  role: Yup.string()
  .oneOf(["student", "professor", "client"], "Selecione um para continuar!"),
}

export default validation
