import * as Yup from "yup"

const validation = {
  email: Yup.string()
    .email("Por favor digite um e-mail válido")
    .required("Ei!! Você esqueceu do e-mail!"),
  password: Yup.string()
    .min(6, "A senha deve conter mais que 6 caracteres!")
    .required("Ei!! Você esqueceu da senha!"),
}

export default validation
