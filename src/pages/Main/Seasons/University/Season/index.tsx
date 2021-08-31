import Style, { Begin, Edict, Edit, Remove } from './styles'
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
  useState
} from 'react'

import { SeasonsContext } from '../..'

import List from 'pages/Main/Seasons/University/List'

import { isoToDate } from 'utils/dates'

import api from 'services/api'

import DownloadIcon from 'assets/global/Download'
import CalendarIcon from 'assets/global/CalendarIcon'
import PencilIcon from 'assets/Inputs/PencilIcon'
import CloseIcon from 'assets/global/CloseIcon'
import TrashIcon from 'assets/global/TrashIcon'

import FieldTable from 'components/Form/FieldTable'
import Form, { Field, File, Submit, Text, Textarea } from 'components/Form'
import Popup, { PopupForwardeds } from 'components/Popup'

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
  season,
  isAdmin,
  selecteds,
  setSelecteds,
  universityId
}: SeasonProps) => {
  const { getUniversitiesOfUser } = useContext(SeasonsContext)

  const popupRef = useRef<PopupForwardeds>(null)

  const [editing, setEditing] = useState(false)

  const actualDate = new Date()
  const { confirm, dispatch, evaluate, in_progress } = season.periods
  const isSelected =
    selecteds?.find(season_id => season_id === id) !== undefined

  const periodsData = [
    { name: 'dispatch', value: dispatch, label: 'Envio de projetos' },
    { name: 'evaluate', value: evaluate, label: 'Avaliação de projetos' },
    { name: 'confirm', value: confirm, label: 'Confirmar participação' },
    { name: 'in_progress', value: in_progress, label: 'Início do projeto' }
  ]

  const afterResData = ({ success }: any) => {
    if (!success)
      popupRef?.current?.configPopup({
        open: true,
        type: 'error',
        message: 'Algo inesperado aconteceu! Tente novamente'
      })
    else
      popupRef?.current?.configPopup({
        open: true,
        type: 'success',
        message: 'Alterações salvas!',
        onClick: () => {
          getUniversitiesOfUser && getUniversitiesOfUser()
          setSelecteds && setSelecteds(undefined)
        }
      })
  }

  const manipulateData = ({
    begin,
    edict,
    title,
    confirm,
    evaluate,
    dispatch,
    in_progress,
    description
  }: any) => {
    const periods = {
      confirm: confirm || season.periods.confirm,
      dispatch: dispatch || season.periods.dispatch,
      evaluate: evaluate || season.periods.evaluate,
      in_progress: in_progress || season.periods.in_progress
    }

    return { begin, edict, title, periods, description }
  }

  const onRemoveClick = () => {
    const onPopupOkClick = async () => {
      const { success } = await api.delete(
        `api/universities/${universityId}/seasons/${id}`
      )

      if (!success)
        popupRef?.current?.configPopup({
          open: true,
          type: 'error',
          message: 'Algo inesperado aconteceu! Tente novamente'
        })
      else
        popupRef?.current?.configPopup({
          open: true,
          type: 'success',
          message: 'Temporada removida',
          onClick: () => {
            getUniversitiesOfUser && getUniversitiesOfUser()
            setSelecteds && setSelecteds(undefined)
          }
        })
    }

    popupRef?.current?.configPopup({
      open: true,
      type: 'warning',
      onOkClick: onPopupOkClick,
      message: 'Tem certeza que deseja remover esta temporada?'
    })
  }

  const components = () => {
    const components = []

    if (editing)
      components.push(
        <Text
          key='title'
          name='title'
          maxLength={50}
          placeholder='Título'
          defaultValue={season.title}
        />,
        <Textarea
          maxLength={500}
          key='description'
          name='description'
          placeholder='Descrição'
          defaultValue={season.description}
        />,
        <Begin key='editing-begin'>
          <span>Início da temporada:</span>

          <Field
            icon={CalendarIcon}
            inputType='datepicker'
            defaultValue={isoToDate(season.begin, 'day/month/2-year')}
            datepickerProps={{
              name: 'begin',
              placeholder: 'Duração em dias',
              startYear: actualDate.getFullYear(),
              endYear: actualDate.getFullYear() + 2,
              minimumDate: {
                day: actualDate.getDate(),
                year: actualDate.getFullYear(),
                month: actualDate.getMonth() + 1
              },
              maximumDate: {
                day: actualDate.getDate(),
                month: actualDate.getMonth() + 1,
                year: actualDate.getFullYear() + 2
              }
            }}
          />
        </Begin>,
        <FieldTable
          edit={editing}
          key='fieldTable'
          data={periodsData}
          valueComplement='Dias'
          header={['Período', 'Duração (Dias)']}
        />,
        <File
          noCropper
          key='edict'
          name='edict'
          label='Enviar Edital'
          accept='application/pdf'
        />,
        <Submit key='submit'>Salvar alterações</Submit>
      )
    else
      components.push(
        <p key='description'>{season.description}</p>,
        <Begin key='begin'>
          Início da temporada: {isoToDate(season.begin, 'day/month/2-year')}
        </Begin>,
        <FieldTable
          edit={editing}
          key='fieldTable'
          data={periodsData}
          valueComplement='Dias'
          header={['Período', 'Duração (Dias)']}
        />,
        <Edict key='edict' download href={season.edict}>
          <DownloadIcon /> Baixar edital
        </Edict>
      )

    return components
  }

  return (
    <>
      <Style editing={editing} isAdmin={isAdmin && isSelected} data-cy='Season'>
        <Form
          method='patch'
          afterResData={afterResData}
          manipulateData={manipulateData}
          path={`api/universities/${universityId}/seasons/${id}`}
        >
          <List
            id={id}
            listKey='seasons'
            title={season.title}
            selecteds={selecteds}
            setSelecteds={setSelecteds}
          >
            {components()}
          </List>
        </Form>

        {isAdmin && isSelected && (
          <Edit onClick={() => setEditing(!editing)} data-cy='EditIcon'>
            {editing ? <CloseIcon /> : <PencilIcon />}
          </Edit>
        )}

        {isAdmin && isSelected && editing && (
          <Remove onClick={onRemoveClick} data-cy='RemoveIcon'>
            <TrashIcon />
          </Remove>
        )}
      </Style>

      <Popup ref={popupRef} />
    </>
  )
}

export default Season
