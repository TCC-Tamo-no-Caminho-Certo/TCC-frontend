import * as Yup from 'yup'

const tokenSchema = Yup.object({
  token: Yup.string()
    .matches(/^([a-z0-9]\s?)+$/, 'Código válido!')
    .min(6, 'Código válido!')
    .max(6, 'Código válido!')
    .required('Você precisa informar seu nome!')
})

export default tokenSchema
