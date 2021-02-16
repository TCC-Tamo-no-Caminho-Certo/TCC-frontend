import * as Yup from 'yup'

const ambiguousSchema = {
  university: Yup.string().required('Você precisa selecionar!'),
  course: Yup.string().required('Você precisa selecionar!'),
  semester: Yup.string().required('Você precisa selecionar!'),
  role: Yup.string().required(),
}

export const emailSchema = Yup.object({
  ...ambiguousSchema,
  email: Yup.string()
    .email('O e-mail deve ser válido!')
    .matches(/^[0-9]+@anhembimorumbi\.edu\.br$/, 'E-mail inválido!')
    .required('Você esqueceu de informar o email!'),
})

export const receiptSchema = Yup.object({
  ...ambiguousSchema,
  receipt: Yup.string().required('Você precisa selecionar um comprovante!'),
})
