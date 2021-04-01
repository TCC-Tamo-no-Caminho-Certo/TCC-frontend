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

  new_password: Yup.string()
    .matches(/^(?=.*[@$!%*?&])/, 'Sua senha deve conter um caractere especial')
    .matches(/^(?=.*[A-Z])/, 'Sua senha deve conter uma letra maiúscula')
    .matches(/^(?=.*[a-z])/, 'Sua senha deve conter uma letra minuscula')
    .matches(/^(?=.*\d)/, 'Sua senha deve conter um número')
    .min(8, 'Sua senha deve conter mais que 8 caracteres'),

  password: Yup.string().required('Você esqueceu de informar a senha!')
})

export default editProfileSchema
