import * as Yup from 'yup'

const loginSchema = Yup.object({
  email: Yup.string()
    .email('O e-mail deve ser válido!')
    .matches(/^(\w\.?)+@(\w\.?)+\.(\w\.?)+$/, 'E-mail inválido!')
    .required('Você esqueceu de informar o email!'),

  password: Yup.string().required('Você esqueceu de informar a senha!'),
})

export default loginSchema
