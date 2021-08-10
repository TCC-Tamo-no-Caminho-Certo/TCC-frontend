import React from 'react'
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
                enableToEdit={edit}
                defaultValue={
                  withoutDefaultValue
                    ? undefined
                    : `${value} ${valueComplement || ''}`
                }
                textProps={{
                  name,
                  min: 1,
                  max: 60,
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
