import React, { Dispatch, SetStateAction } from 'react'
import Style, { Begin } from './styles'

import CalendarIcon from 'assets/global/CalendarIcon'

import FieldTable from 'components/Form/FieldTable'
import AnimatedList from 'components/AnimatedList'
import { Field, File, Submit, Textarea } from 'components/Form'

interface CreateSeasonProps {
  id: string
  selecteds?: string[]
  setSelecteds?: Dispatch<SetStateAction<string[] | undefined>>
}

const periodsData = [
  {
    name: 'dispatch',
    value: undefined,
    label: 'Envio de projetos'
  },
  {
    name: 'evaluate',
    value: undefined,
    label: 'Avaliação de projetos'
  },
  {
    name: 'confirm',
    value: undefined,
    label: 'Confirmar participação'
  },
  {
    name: 'in_progress',
    value: undefined,
    label: 'Início do projeto'
  }
]

const CreateSeason = ({ id, selecteds, setSelecteds }: CreateSeasonProps) => (
  <AnimatedList
    addClose
    title='Adicionar temporada'
    id={id}
    selecteds={selecteds}
    setSelecteds={setSelecteds}
  >
    <Style>
      <Textarea name='description' placeholder='Descrição' />

      <Begin>
        <span>Início da temporada:</span>

        <Field
          enableEdit={true}
          inputType='datepicker'
          icon={CalendarIcon}
          datepickerProps={{
            name: 'begin',
            placeholder: 'Duração em dias',
            arrow: 'bottom'
          }}
        />
      </Begin>

      <FieldTable
        withoutDefaultValue
        edit={true}
        data={periodsData}
        header={['Período', 'Duração (Dias)']}
        valueComplement='Dias'
      />

      <File
        noCropper
        name='edict'
        label='Enviar Edital'
        accept='application/pdf'
      />

      <Submit>Adicionar temporada</Submit>
    </Style>
  </AnimatedList>
)

export default CreateSeason
