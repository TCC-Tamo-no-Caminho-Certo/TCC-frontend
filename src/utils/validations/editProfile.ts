import * as Yup from 'yup'

const linkelattes = {
  linkedin: Yup.string().matches(
    /^((http|https):\/\/)www\.linkedin\.com\/[a-zA-Z0-9-]{1,40}$/
  ),

  lattes: Yup.string().matches(/^http:\/\/lattes\.cnpq\.br\/[0-9]{1,40}$/)
}

const personal = Yup.object({
  name: Yup.string().matches(/^([A-zÀ-ú]\s?)+$/, 'Informe um nome válido!'),

  surname: Yup.string().matches(
    /^([A-zÀ-ú]\s?)+$/,
    'Informe um sobrenome válido!'
  ),

  email: Yup.string()
    .email('E-mail inválido!')
    .matches(/^(\w\.?)+@(\w\.?)+\.(\w\.?)+$/, 'E-mail inválido!'),

  birthday: Yup.string(),

  new_password: Yup.string()
    .matches(/^(?=.*[@$!%*?&])/, 'Sua senha deve conter um caractere especial')
    .matches(/^(?=.*[A-Z])/, 'Sua senha deve conter uma letra maiúscula')
    .matches(/^(?=.*[a-z])/, 'Sua senha deve conter uma letra minuscula')
    .matches(/^(?=.*\d)/, 'Sua senha deve conter um número')
    .min(8, 'Sua senha deve conter mais que 8 caracteres')
})

const student = Yup.object(linkelattes)

const professor = Yup.object({
  ...linkelattes,
  orcid: Yup.string(),
  full_time: Yup.boolean()
})

const profileAndRolesSchema = {
  student,
  personal,
  professor
}

export default profileAndRolesSchema
