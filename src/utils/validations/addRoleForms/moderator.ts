import * as Yup from 'yup'

export const withFullName = Yup.object({
  full_name: Yup.boolean(),
  pretext: Yup.string().required(
    'Você precisa enviar uma justificativa de até 500 caracteres.'
  )
})

export const withoutFullName = Yup.object({})
