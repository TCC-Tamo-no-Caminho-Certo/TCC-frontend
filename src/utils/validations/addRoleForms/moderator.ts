import * as Yup from 'yup'

export const withFullName = Yup.object({
  full_name: Yup.boolean().required(),
  pretext: Yup.string().required()
})

export const withoutFullName = Yup.object({})
