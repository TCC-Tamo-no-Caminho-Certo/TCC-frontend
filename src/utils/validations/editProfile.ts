import * as Yup from 'yup'

export interface EditProfileSchema {
  student: Yup.ObjectSchema
  personal: Yup.ObjectSchema
  professor: Yup.ObjectSchema
}

const linkelattes = {
  linkedin: Yup.string().matches(
    /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-/]{1,40}$/,
    'Linkedin inválido!'
  ),
  lattes: Yup.string().matches(
    /^http:\/\/lattes\.cnpq\.br\/[0-9]{1,40}$/,
    'Lattes inválido!'
  )
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
    .min(8, 'Sua senha deve conter mais que 8 caracteres'),

  confirm_new_password: Yup.string().oneOf(
    [Yup.ref('new_password')],
    'As senhas não se correspondem.'
  )
})

const student = Yup.object(linkelattes)

const professor = Yup.object({
  ...linkelattes,
  orcid: Yup.string(),
  full_time: Yup.boolean()
})

const profileAndRolesSchema: EditProfileSchema = {
  student,
  personal,
  professor
}

export default profileAndRolesSchema
