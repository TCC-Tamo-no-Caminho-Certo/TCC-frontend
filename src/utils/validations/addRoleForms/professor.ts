import * as Yup from 'yup'

const ambiguous = (register: string) => {
  const academic_register = new RegExp(register)

  return {
    lattes: Yup.string(),
    linkedin: Yup.string(),
    orcid: Yup.string(),
    university_id: Yup.number().required('Você precisa selecionar!'),
    register: Yup.string()
      .matches(academic_register, 'Ra inválido!')
      .required('Digite seu RA'),
    campus_id: Yup.number().required('Você precisa selecionar!'),
    course_id: Yup.number().required('Você precisa selecionar!'),
    postgraduate: Yup.boolean(),
    full_time: Yup.boolean()
  }
}

export const emailSchema = (register: string) =>
  Yup.object({ ...ambiguous(register) })

export const receiptSchema = (register: string) =>
  Yup.object({
    ...ambiguous(register),
    voucher: Yup.string().required('Você precisa selecionar um comprovante!')
  })
