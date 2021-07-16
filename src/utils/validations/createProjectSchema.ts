import * as Yup from 'yup'

const createProjectSchema = Yup.object({
  title: Yup.string()
    .max(30, 'Título deve conter até 32 caracteres.')
    .required('Você esqueceu de informar o título.'),

  university: Yup.string().required('Selecione a universidade!'),

  description: Yup.string().max(
    500,
    'A descrição deve conter até 500 caracteres.'
  ),

  document: Yup.string().required('Você precisa enviar um documento!')
})

export default createProjectSchema
