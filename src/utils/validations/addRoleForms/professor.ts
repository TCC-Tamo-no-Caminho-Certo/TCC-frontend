import * as Yup from 'yup'

const ambiguous = {
  university_id: Yup.number().required('Você precisa selecionar!'),
  register: Yup.string()
    .matches(/[0-9]/, 'Registro acadêmico precisa ser números!')
    .required('Digite seu RA'),
  campus_id: Yup.number().required('Você precisa selecionar!'),
  course_id: Yup.number().required('Você precisa selecionar!'),
  full_time: Yup.boolean()
}

export const emailSchema = Yup.object({
  ...ambiguous
})

export const receiptSchema = Yup.object({
  ...ambiguous,
  voucher: Yup.string().required('Você precisa selecionar um comprovante!')
})
