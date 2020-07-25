import * as Yup from 'yup'

const signupSchema = Yup.object({
  name: Yup.string()
    .matches(/[a-z]+\s[a-z]+(\s[a-z]+)*/i, 'informe seu nome e sobrenome')
    .required('Você precisa informar seu nome'),

  email: Yup.string()
    .email('O e-mail deve ser válido!')
    .required('Você esqueceu do email!'),

  password: Yup.string()
    .matches(
      /^(?=.*[#?!@$%^&+{}()["';,°<>~=_/|\].-]).{8,}$/,
      'Sua senha deve conter um caractere especial'
    )
    .matches(/^(?=.*[A-Z]).{8,}$/, 'Sua senha deve conter uma letra maiúscula')
    .matches(/^(?=.*[a-z]).{8,}$/, 'Sua senha deve conter uma letra minuscula')
    .matches(/^(?=.*[0-9]).{8,}$/, 'Sua senha deve conter um número')
    .min(8, 'Sua senha deve conter mais que 8 caracteres')
    .required('Você precisa de uma senha!'),

  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas não são iguais')
    .required('Você precisa confirmar sua senha'),
})

export default signupSchema
