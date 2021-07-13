import React, { useState } from 'react'
import Style from './styles'

import CalendarIcon from 'assets/global/CalendarIcon'

import { Field } from 'components/Form'

import { PeriodsType } from 'types/Responses/university/seasons'

interface DatesTableProps {
  periods: PeriodsType
  isAdmin: boolean
}

const DatesTable = ({
  isAdmin,
  periods: { evaluate, in_progress, confirm, dispatch }
}: DatesTableProps) => {
  const [selecteds, setSelecteds] = useState<number[]>()

  const periodsArray = [
    {
      name: 'dispatch',
      value: dispatch,
      label: 'Envio de projetos'
    },
    {
      name: 'evaluate',
      value: evaluate,
      label: 'Avaliação de projetos'
    },
    {
      name: 'confirm',
      value: confirm,
      label: 'Confirmar participação'
    },
    {
      name: 'in_progress',
      value: in_progress,
      label: 'Início do projeto'
    }
  ]

  const onCloseClick = (id: number) => {
    setSelecteds(prev => prev?.filter(currPrev => currPrev !== id))
  }

  const onFieldClick = (id: number) => {
    setSelecteds(prev => {
      if (prev?.find(currPrev => currPrev === id) !== undefined) return prev
      return prev ? [...prev, id] : [id]
    })
  }

  return (
    <Style>
      <thead>
        <tr>
          <th>Período</th>

          <th>Duração (Dias)</th>
        </tr>
      </thead>

      <tbody>
        {periodsArray.map(({ name, label, value }, index) => (
          <tr key={index}>
            <td>{label}</td>

            <td>
              <Field
                icon={CalendarIcon}
                enableEdit={isAdmin}
                defaultValue={`${value} dias`}
                onCloseClick={() => onCloseClick(index)}
                onFieldClick={() => onFieldClick(index)}
                conditionToEdit={
                  selecteds?.find(selected => selected === index) !== undefined
                }
                textProps={{
                  name,
                  type: 'number',
                  placeholder: 'Duração'
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Style>
  )
}

export default DatesTable
