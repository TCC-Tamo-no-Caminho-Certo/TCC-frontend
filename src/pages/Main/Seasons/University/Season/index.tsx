import Style, { Begin, Edict } from './styles'
import React, { Dispatch, SetStateAction } from 'react'

import DownloadIcon from 'assets/global/Download'
import CalendarIcon from 'assets/global/CalendarIcon'

import FieldTable from 'components/Form/FieldTable'
import { Field, File, Submit, Textarea } from 'components/Form'
import AnimatedList from 'components/AnimatedList'

import { SeasonType } from 'types/Responses/university/seasons'

interface SeasonProps {
  id: string
  isAdmin: boolean
  season: SeasonType
  selecteds?: string[]
  setSelecteds?: Dispatch<SetStateAction<string[] | undefined>>
}

const Season = ({
  id,
  isAdmin,
  selecteds,
  setSelecteds,
  season: { title, description, begin, edict, periods }
}: SeasonProps) => {
  const periodsData = [
    {
      name: 'dispatch',
      value: periods.dispatch,
      label: 'Envio de projetos'
    },
    {
      name: 'evaluate',
      value: periods.evaluate,
      label: 'Avaliação de projetos'
    },
    {
      name: 'confirm',
      value: periods.confirm,
      label: 'Confirmar participação'
    },
    {
      name: 'in_progress',
      value: periods.in_progress,
      label: 'Início do projeto'
    }
  ]

  return (
    <AnimatedList
      id={id}
      title={title}
      selecteds={selecteds}
      setSelecteds={setSelecteds}
    >
      <Style>
        {isAdmin ? (
          <Textarea
            name='description'
            placeholder='Descrição'
            defaultValue={description}
          />
        ) : (
          <p>{description}</p>
        )}

        <Begin>
          {isAdmin ? (
            <>
              <span>Início da temporada:</span>

              <Field
                inputType='datepicker'
                icon={CalendarIcon}
                enableEdit={isAdmin}
                defaultValue={begin}
                datepickerProps={{
                  name: 'begin',
                  placeholder: 'Duração em dias'
                }}
              />
            </>
          ) : (
            <div id='beginDate'>Início da temporada: {begin}</div>
          )}
        </Begin>

        <FieldTable
          edit={isAdmin}
          data={periodsData}
          valueComplement='Dias'
          header={['Período', 'Duração (Dias)']}
        />

        {isAdmin ? (
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
