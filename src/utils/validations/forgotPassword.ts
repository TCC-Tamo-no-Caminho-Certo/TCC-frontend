import * as Yup from 'yup'

export const emailSchema = Yup.object({
  email: Yup.string()
    .email('O e-mail deve ser válido!')
    .matches(
      /^(\w\.?)+@(\w\.?)+\.(\w\.?)+$/,
      'E-mail inválido, verifique novamente!'
    )
    .required('Você esqueceu de informar o email!')
})

export const passwordSchema = Yup.object({
  password: Yup.string()
    .matches(
      /^(?=.*[#?!@$%^&+{}()["';,°<>~=_/|\].-]).{8,}$/,
      'Sua senha deve conter um caractere especial'
    )
    .matches(/^(?=.*[A-Z]).{8,}$/, 'Sua senha deve conter uma letra maiúscula')
    .matches(/^(?=.*[a-z]).{8,}$/, 'Sua senha deve conter uma letra minuscula')
    .matches(/^(?=.*[0-9]).{8,}$/, 'Sua senha deve conter um número')
    .min(8, 'Sua senha deve conter mais que 8 caracteres')
    .required('Você precisa definir uma senha!'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas não são iguais')
    .required('Você precisa confirmar sua senha!')
})

export const tokenSchema = Yup.object({
  password: Yup.number()
    .required('Código necessário para prosseguir com a alterção')
    .min(6, 'Verifique se o tamanho corresponde a 6 números')
    .max(6, 'Verifique se o tamanho corresponde a 6 números')
})
