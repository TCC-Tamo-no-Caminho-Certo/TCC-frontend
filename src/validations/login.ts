import Joi from '@hapi/joi'

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(50)
    .required()
    .messages({
      'string.empty': `Você esqueceu do e-mail!`,
      'any.required': `Você esqueceu do email!`,
      'string.max': `Você ultrapassou o limite de caracteres!`,
    }),

  password: Joi.string()
    .min(8)
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*+{}()[\]/"';,.°~=|_-]).{8,}$/
    )
    .required()
    .messages({
      'string.empty': `Não deixe a senha vazia!`,
      'any.required': `Não deixe a senha vazia!`,
      'string.min': `A senha deve conter mais que 8 caracteres!`,
    }),
})

export default loginSchema
