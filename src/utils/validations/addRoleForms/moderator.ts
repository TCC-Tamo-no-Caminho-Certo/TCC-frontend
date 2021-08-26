import * as Yup from 'yup'

export const withFullTime = Yup.object({
  university_id: Yup.number().required(
    'Você precisa selecionar um universidade!'
  )
})

export const withoutFullTime = Yup.object({
  university_id: Yup.number().required(
    'Você precisa selecionar um universidade!'
  ),
  pretext: Yup.string().required(
    'Você precisa enviar uma justificativa de até 500 caracteres.'
  )
})
