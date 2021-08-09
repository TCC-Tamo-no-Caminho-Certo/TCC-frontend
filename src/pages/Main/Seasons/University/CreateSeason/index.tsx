import React, { Dispatch, SetStateAction, useContext } from 'react'
import Style, { Begin } from './styles'

import { SeasonsContext } from '../..'

import createSeasonSchema from 'utils/validations/createSeasonSchema'

import CalendarIcon from 'assets/global/CalendarIcon'

import FieldTable from 'components/Form/FieldTable'
import AnimatedList from 'components/AnimatedList'
import { Field, File, Submit, Text, Textarea } from 'components/Form'

import { GlobalContext } from 'App'

interface CreateSeasonProps {
  id: number
  universityId: number
  selecteds?: number[]
  setSelecteds?: Dispatch<SetStateAction<number[] | undefined>>
}

const periodsData = [
  { name: 'dispatch', value: undefined, label: 'Envio de projetos' },
  { name: 'evaluate', value: undefined, label: 'Avaliação de projetos' },
  { name: 'confirm', value: undefined, label: 'Confirmar participação' },
  { value: undefined, name: 'in_progress', label: 'Em andamento' }
]

const CreateSeason = ({
  id,
  selecteds,
  setSelecteds,
  universityId
}: CreateSeasonProps) => {
  const { popupRef } = useContext(GlobalContext)
  const { getUniversitiesOfUser } = useContext(SeasonsContext)

  const manipulateData = (data: any) => {
    const {
      title,
      begin,
      edict,
      confirm,
      dispatch,
      evaluate,
      in_progress,
      description
    } = data

    const periods = { confirm, evaluate, dispatch, in_progress }
    return { begin, edict, title, periods, description }
  }

  const afterResData = (data: any) => {
    if (!data.success)
      popupRef?.current?.configPopup({
        type: 'error',
        message: 'Algo inesperado aconteceu! Tente novamente'
      })
    else
      popupRef?.current?.configPopup({
        type: 'success',
        message: 'Temporada adicionada!',
        onClick: () => {
          getUniversitiesOfUser && getUniversitiesOfUser()
          setSelecteds && setSelecteds(undefined)
        }
      })
  }

  return (
    <Style
      afterResData={afterResData}
      schema={createSeasonSchema}
      manipulateData={manipulateData}
      path={`/universities/${universityId}/seasons`}
    >
      <AnimatedList
        addClose
        title='Adicionar temporada'
        id={id}
        selecteds={selecteds}
        setSelecteds={setSelecteds}
      >
        <Text name='title' placeholder='Título' maxLength={50} />

        <Textarea name='description' placeholder='Descrição' maxLength={500} />

        <Begin>
          <Field
            enableEdit={true}
            inputType='datepicker'
            icon={CalendarIcon}
            datepickerProps={{
              name: 'begin',
              arrow: 'bottom',
              placeholder: 'Início da temporada'
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

        <Submit>Adicionar</Submit>
      </AnimatedList>
    </Style>
  )
}

export default CreateSeason
