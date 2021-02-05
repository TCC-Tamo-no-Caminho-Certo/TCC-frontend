import * as Yup from 'yup'

const studentSchema = Yup.object({
  university: Yup.string().required('Você precisa selecionar!'),
  course: Yup.string().required('Você precisa selecionar!'),
  semester: Yup.string().required('Você precisa selecionar!'),

  email: Yup.string()
    .email('O e-mail deve ser válido!')
    .matches(/^[0-9]+@anhembimorumbi\.edu\.br$/, 'E-mail inválido!')
    .required('Você esqueceu de informar o email!'),
})

export default studentSchema
