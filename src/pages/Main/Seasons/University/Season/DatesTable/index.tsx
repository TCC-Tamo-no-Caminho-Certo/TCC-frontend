import React, { useState } from 'react'
import Style, { DefaultField, Field } from './styles'

import CalendarIcon from 'assets/global/CalendarIcon'
import CloseIcon from 'assets/global/CloseIcon'
import PencilIcon from 'assets/Inputs/PencilIcon'

import { Text } from 'components/Form'

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

  const onDefaultFieldClick = (id: number) => {
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

          <th>Duração</th>
        </tr>
      </thead>

      <tbody>
        {periodsArray.map(({ name, label, value }, index) => (
          <tr key={index}>
            <td>{label}</td>

            <td id='specialTd'>
              {selecteds?.find(selected => selected === index) !== undefined ? (
                <Field>
                  <CalendarIcon id='calendarIcon' />

                  <Text
                    type='number'
                    name={name}
                    placeholder='Duração em dias'
                  />

                  <CloseIcon
                    id='closeIcon'
                    onClick={() => onCloseClick(index)}
                  />
                </Field>
              ) : (
                <DefaultField
                  onClick={() => onDefaultFieldClick(index)}
                  style={{ cursor: isAdmin ? 'pointer' : 'default' }}
                >
                  {isAdmin && <PencilIcon />}

                  {`${value} dias.`}
                </DefaultField>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Style>
  )
}

export default DatesTable
