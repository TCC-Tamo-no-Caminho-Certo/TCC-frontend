import Joi from '@hapi/joi'

const signupSchema = Joi.object({
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
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .required()
    .messages({
      'string.empty': `A senha deve conter mais que 8 caracteres`,
      'string.min': `A senha deve conter mais que 8 caracteres!`,
      'any.required': `Não deixe a senha vazia!`,
    }),
})

export default signupSchema
