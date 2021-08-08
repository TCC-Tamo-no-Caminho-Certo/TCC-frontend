import Style, { Begin, Edict, Title } from './styles'
import React, { Dispatch, SetStateAction, useState } from 'react'

import { isoToDate } from 'utils/dates'

import DownloadIcon from 'assets/global/Download'
import CalendarIcon from 'assets/global/CalendarIcon'
import PencilIcon from 'assets/Inputs/PencilIcon'
import CloseIcon from 'assets/global/CloseIcon'

import FieldTable from 'components/Form/FieldTable'
import { Field, File, Submit, Text, Textarea } from 'components/Form'
import AnimatedList from 'components/AnimatedList'

import { SeasonType } from 'types/Responses/university/seasons'

interface SeasonProps {
  id: number
  isAdmin: boolean
  season: SeasonType
  universityId: number
  selecteds?: number[]
  setSelecteds?: Dispatch<SetStateAction<number[] | undefined>>
}

const Season = ({
  id,
  isAdmin,
  selecteds,
  setSelecteds,
  universityId,
  season: { title, description, begin, edict, periods }
}: SeasonProps) => {
  const [editing, setEditing] = useState(false)

  const { confirm, dispatch, evaluate, in_progress } = periods

  const periodsData = [
    { name: 'dispatch', value: dispatch, label: 'Envio de projetos' },
    { name: 'evaluate', value: evaluate, label: 'Avaliação de projetos' },
    { name: 'confirm', value: confirm, label: 'Confirmar participação' },
    { name: 'in_progress', value: in_progress, label: 'Início do projeto' }
  ]

  const manipulateData = (data: any) => {
    const {
      dispatch,
      evaluate,
      confirm,
      in_progress,
      begin,
      edict,
      title,
      description
    } = data

    const periods = { confirm, evaluate, dispatch, in_progress }
    return { begin, edict, title, periods, description }
  }

  return (
    <AnimatedList
      id={id}
      title={title}
      selecteds={selecteds}
      setSelecteds={setSelecteds}
    >
      <Style
        method='patch'
        path={`/universities/${universityId}/seasons/${id}`}
        manipulateData={manipulateData}
      >
        <Title onClick={() => setEditing(!editing)}>
          {isAdmin && (
            <div id='icon'>{editing ? <CloseIcon /> : <PencilIcon />}</div>
          )}
        </Title>

        {editing && <Text name='title' placeholder='Título' maxLength={50} />}

        {editing ? (
          <Textarea
            name='description'
            placeholder='Descrição'
            maxLength={500}
            defaultValue={description}
          />
        ) : (
          <p>{description}</p>
        )}

        <Begin>
          {editing ? (
            <>
              <span>Início da temporada:</span>

              <Field
                inputType='datepicker'
                icon={CalendarIcon}
                enableEdit={editing}
                defaultValue={isoToDate(begin, 'day/month/2-year')}
                datepickerProps={{
                  name: 'begin',
                  placeholder: 'Duração em dias'
                }}
              />
            </>
          ) : (
            <div id='beginDate'>
              Início da temporada: {isoToDate(begin, 'day/month/2-year')}
            </div>
          )}
        </Begin>

        <FieldTable
          edit={editing}
          data={periodsData}
          valueComplement='Dias'
          header={['Período', 'Duração (Dias)']}
        />

        {editing ? (
          <>
            <File
              noCropper
              name='edict'
              label='Enviar Edital'
              accept='application/pdf'
            />

            <Submit>Salvar alterações</Submit>
          </>
        ) : (
          <Edict download href={edict}>
            <DownloadIcon /> Baixar edital
          </Edict>
        )}
      </Style>
    </AnimatedList>
  )
}

export default Season
