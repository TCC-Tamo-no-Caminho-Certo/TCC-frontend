import * as Yup from 'yup'

const ambiguous = (register: string) => {
  const academic_register = new RegExp(register)

  return {
    university_id: Yup.number().required('Você precisa selecionar!'),
    campus_id: Yup.number().required('Você precisa selecionar!'),
    course_id: Yup.number().required('Você precisa selecionar!'),
    semester: Yup.number().required('Você precisa selecionar!'),
    register: Yup.string().matches(academic_register)
  }
}

export const emailSchema = (register: string) =>
  Yup.object({ ...ambiguous(register) })

export const receiptSchema = (register: string) =>
  Yup.object({
    ...ambiguous(register),
    voucher: Yup.string().required('Você precisa selecionar um comprovante!')
  })
