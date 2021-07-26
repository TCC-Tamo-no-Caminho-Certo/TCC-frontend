import React, { useState } from 'react'
import Style from './styles'

import CalendarIcon from 'assets/global/CalendarIcon'

import { Field } from 'components/Form'

type FieldTableDataType = { name: string; label: string; value?: any }[]

interface DatesTableProps {
  edit: boolean
  header: string[]
  data: FieldTableDataType
  valueComplement?: string
  withoutDefaultValue?: boolean
}

const DatesTable = ({
  edit,
  data,
  header,
  valueComplement,
  withoutDefaultValue = false
}: DatesTableProps) => {
  const [selecteds, setSelecteds] = useState<number[]>()

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
          <th>{header[0]}</th>

          <th>{header[1]}</th>
        </tr>
      </thead>

      <tbody>
        {data.map(({ name, label, value }, index) => (
          <tr key={index}>
            <td>{label}</td>

            <td>
              <Field
                icon={CalendarIcon}
                enableEdit={edit}
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
                defaultValue={
                  withoutDefaultValue
                    ? undefined
                    : `${value} ${valueComplement || ''}`
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Style>
  )
}

export default DatesTable
