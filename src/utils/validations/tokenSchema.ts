import * as Yup from 'yup'

const tokenSchema = Yup.object({
  token: Yup.string()
    .matches(/^([a-z0-9]\s?)+$/, 'Código inválido!')
    .min(6, 'Código inválido!')
    .max(6, 'Código inválido!')
    .required('Você precisa informar o código!')
})

export default tokenSchema
