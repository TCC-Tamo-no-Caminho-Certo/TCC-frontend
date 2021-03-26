import * as Yup from 'yup'

const editProfileSchema = Yup.object({
  name: Yup.string().matches(/^([A-zÀ-ú]\s?)+$/, 'Informe um nome válido!'),

  surname: Yup.string().matches(
    /^([A-zÀ-ú]\s?)+$/,
    'Informe um sobrenome válido!'
  ),

  email: Yup.string()
    .email('E-mail inválido!')
    .matches(/^(\w\.?)+@(\w\.?)+\.(\w\.?)+$/, 'E-mail inválido!'),

  birthday: Yup.string(),

  password: Yup.string().required('Você esqueceu de informar a senha!')
})

export default editProfileSchema
