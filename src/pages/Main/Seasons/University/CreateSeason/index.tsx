import React, { Dispatch, SetStateAction, useContext, useRef } from 'react'
import Style, { Begin } from './styles'

import { SeasonsContext } from '../..'

import List from 'pages/Main/Seasons/University/List'

import createSeasonSchema from 'utils/validations/createSeasonSchema'

import CalendarIcon from 'assets/global/CalendarIcon'

import FieldTable from 'components/Form/FieldTable'
import Form, { Field, File, Submit, Text, Textarea } from 'components/Form'
import Popup, { PopupForwardeds } from 'components/Popup'

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
  const popupRef = useRef<PopupForwardeds>(null)
  const { getUniversitiesOfUser } = useContext(SeasonsContext)

  const actualDate = new Date()

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
        open: true,
        type: 'error',
        message: 'Algo inesperado aconteceu! Tente novamente'
      })
    else
      popupRef?.current?.configPopup({
        open: true,
        type: 'success',
        message: 'Temporada adicionada!',
        onClick: () => {
          getUniversitiesOfUser && getUniversitiesOfUser()
          setSelecteds && setSelecteds(undefined)
        }
      })
  }

  return (
    <>
      <Style>
        <Form
          afterResData={afterResData}
          schema={createSeasonSchema}
          manipulateData={manipulateData}
          path={`api/universities/${universityId}/seasons`}
        >
          <List
            id={id}
            addClose
            selecteds={selecteds}
            title='Adicionar temporada'
            setSelecteds={setSelecteds}
          >
            <Text name='title' placeholder='Título' maxLength={50} />

            <Textarea
              maxLength={500}
              name='description'
              placeholder='Descrição'
            />

            <Begin>
              <Field
                icon={CalendarIcon}
                inputType='datepicker'
                datepickerProps={{
                  name: 'begin',
                  arrow: 'bottom',
                  placeholder: 'Início da temporada',
                  startYear: actualDate.getFullYear(),
                  endYear: actualDate.getFullYear() + 2,
                  minimumDate: {
                    year: actualDate.getFullYear(),
                    month: actualDate.getMonth() + 1,
                    day: actualDate.getDate()
                  },
                  maximumDate: {
                    year: actualDate.getFullYear() + 2,
                    month: actualDate.getMonth() + 1,
                    day: actualDate.getDate()
                  }
                }}
              />
            </Begin>

            <FieldTable
              edit={true}
              data={periodsData}
              withoutDefaultValue
              valueComplement='Dias'
              header={['Período', 'Duração (Dias)']}
            />

            <File
              noCropper
              name='edict'
              label='Enviar Edital'
              accept='application/pdf'
            />

            <Submit>Adicionar</Submit>
          </List>
        </Form>
      </Style>

      <Popup ref={popupRef} />
    </>
  )
}

export default CreateSeason
