import * as Yup from 'yup'

const ambiguous = {
  university_id: Yup.number().required('Você precisa selecionar!'),
  ar: Yup.string()
    .matches(/[0-9]/, 'RA precisa ser um número!')
    .required('Digite seu RA'),
  campus_id: Yup.number().required('Você precisa selecionar!'),
  course_id: Yup.number().required('Você precisa selecionar!'),
  semester: Yup.number().required('Você precisa selecionar!')
}

export const emailSchema = Yup.object({
  ...ambiguous
})

export const receiptSchema = Yup.object({
  ...ambiguous,
  doc: Yup.string().required('Você precisa selecionar um comprovante!')
})
