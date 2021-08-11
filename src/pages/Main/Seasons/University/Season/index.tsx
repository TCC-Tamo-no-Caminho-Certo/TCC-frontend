import Style, { Begin, Edict, Edit, Remove } from './styles'
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
  useState
} from 'react'

import { SeasonsContext } from '../..'

import { isoToDate } from 'utils/dates'

import api from 'services/api'

import DownloadIcon from 'assets/global/Download'
import CalendarIcon from 'assets/global/CalendarIcon'
import PencilIcon from 'assets/Inputs/PencilIcon'
import CloseIcon from 'assets/global/CloseIcon'
import TrashIcon from 'assets/global/TrashIcon'

import FieldTable from 'components/Form/FieldTable'
import { Field, File, Submit, Text, Textarea } from 'components/Form'
import AnimatedList from 'components/AnimatedList'
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
  isAdmin,
  selecteds,
  setSelecteds,
  universityId,
  season: { title, description, begin, edict, periods }
}: SeasonProps) => {
  const { getUniversitiesOfUser } = useContext(SeasonsContext)

  const popupRef = useRef<PopupForwardeds>(null)

  const [editing, setEditing] = useState(false)

  const { confirm, dispatch, evaluate, in_progress } = periods

  const periodsData = [
    { name: 'dispatch', value: dispatch, label: 'Envio de projetos' },
    { name: 'evaluate', value: evaluate, label: 'Avaliação de projetos' },
    { name: 'confirm', value: confirm, label: 'Confirmar participação' },
    { name: 'in_progress', value: in_progress, label: 'Início do projeto' }
  ]

  const afterResData = (data: any) => {
    if (!data.success)
      popupRef?.current?.configPopup({
        type: 'error',
        open: true,
        message: 'Algo inesperado aconteceu! Tente novamente'
      })
    else
      popupRef?.current?.configPopup({
        type: 'success',
        message: 'Alterações salvas!',
        open: true,
        onClick: () => {
          getUniversitiesOfUser && getUniversitiesOfUser()
          setSelecteds && setSelecteds(undefined)
        }
      })
  }

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

  const onRemoveClick = () => {
    const onPopupOkClick = async () => {
      const { success } = await api.delete(
        `/universities/${universityId}/seasons/${id}`
      )

      if (!success)
        popupRef?.current?.configPopup({
          type: 'error',
          open: true,
          message: 'Algo inesperado aconteceu! Tente novamente'
        })
      else
        popupRef?.current?.configPopup({
          type: 'success',
          message: 'Temporada removida',
          open: true,
          onClick: () => {
            getUniversitiesOfUser && getUniversitiesOfUser()
            setSelecteds && setSelecteds(undefined)
          }
        })
    }

    popupRef?.current?.configPopup({
      open: true,
      type: 'warning',
      message: 'Tem certeza que deseja remover esta temporada',
      onOkClick: onPopupOkClick
    })
  }

  return (
    <>
      <Style
        method='patch'
        editing={editing}
        afterResData={afterResData}
        manipulateData={manipulateData}
        path={`/universities/${universityId}/seasons/${id}`}
        isAdmin={
          isAdmin &&
          selecteds?.find(season_id => season_id === id) !== undefined
        }
      >
        <AnimatedList
          id={id}
          title={title}
          selecteds={selecteds}
          setSelecteds={setSelecteds}
        >
          {editing && <Text name='title' placeholder='Título' maxLength={50} />}

          {editing ? (
            <Textarea
              maxLength={500}
              name='description'
              placeholder='Descrição'
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
                  icon={CalendarIcon}
                  inputType='datepicker'
                  defaultValue={isoToDate(begin, 'day/month/2-year')}
                  datepickerProps={{
                    name: 'begin',
                    placeholder: 'Duração em dias'
                  }}
                />
              </>
            ) : (
              <div>
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

          {isAdmin && (
            <Edit onClick={() => setEditing(!editing)}>
              {editing ? <CloseIcon /> : <PencilIcon />}
            </Edit>
          )}

          {isAdmin && editing && (
            <Remove onClick={onRemoveClick}>
              <TrashIcon />
            </Remove>
          )}
        </AnimatedList>
      </Style>

      <Popup ref={popupRef} />
    </>
  )
}

export default Season
