import * as Yup from 'yup'

const createSeasonSchema = Yup.object({
  title: Yup.string()
    .max(50, 'Título deve conter até 50 caracteres.')
    .required('Você precisa informar o título.'),

  description: Yup.string().max(
    500,
    'A descrição deve conter até 500 caracteres.'
  ),

  begin: Yup.string().required('Selecione uma data inicial!'),

  edict: Yup.string().required('Você precisa enviar um documento!'),

  dispatch: Yup.number()
    .min(1, 'Mínimo de 1 dia.')
    .max(60, 'Máximo de 60 dias.')
    .required('Informe uma duração'),

  evaluate: Yup.number()
    .min(1, 'Mínimo de 1 dia.')
    .max(60, 'Máximo de 60 dias.')
    .required('Informe uma duração'),

  confirm: Yup.number()
    .min(1, 'Mínimo de 1 dia.')
    .max(60, 'Máximo de 60 dias.')
    .required('Informe uma duração'),

  in_progress: Yup.number()
    .min(1, 'Mínimo de 1 dia.')
    .max(60, 'Máximo de 60 dias.')
    .required('Informe uma duração')
})

export default createSeasonSchema
