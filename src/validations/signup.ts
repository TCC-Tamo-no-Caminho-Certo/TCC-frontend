import * as Yup from 'yup'

const signupSchema = Yup.object({
  name: Yup.string()
    .matches(/^([A-zÀ-ú]\s?)+$/g, 'Informe um nome válido!')
    .required('Você precisa informar seu nome!'),

  surname: Yup.string()
    .matches(/^([A-zÀ-ú]\s?)+$/g, 'Informe um sobrenome válido!')
    .required('Você precisa informar seu sobrenome!'),

  email: Yup.string()
    .email('E-mail inválido!')
    .matches(/^([\wÁ-ú]\.?)+@([\wÁ-ú]\.?)+\.([\wÁ-ú]\.?)+$/g, 'E-mail inválido!')
    .required('É necessário informar o email!'),

  birthday: Yup.string().required('É necessário informar a data!'),

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

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas não são iguais')
    .required('Você precisa confirmar sua senha!'),
})

export default signupSchema
