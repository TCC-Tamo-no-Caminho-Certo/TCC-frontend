import * as Yup from 'yup'

const ambiguousSchema = {
  university: Yup.array().required('Você precisa selecionar!'),
  course: Yup.string().required('Você precisa selecionar!'),
}

export const emailSchema = Yup.object({
  ...ambiguousSchema,
  email: Yup.string()
    .email('O e-mail deve ser válido!')
    .matches(/^[a-z]+@anhembimorumbi\.br$/, 'E-mail inválido!')
    .required('Você esqueceu de informar o email!'),
})

export const receiptSchema = Yup.object({
  ...ambiguousSchema,
  receipt: Yup.string().required('Você precisa selecionar um comprovante!'),
})
