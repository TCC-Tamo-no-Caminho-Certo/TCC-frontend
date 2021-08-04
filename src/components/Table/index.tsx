import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import Style from './styles'

import DotsLoader from 'components/DotsLoader'

export type HeaderType = {
  label: string
  name: string
  tdWrapper?: (_label: string) => ReactElement | ReactElement[]
  thWrapper?: (_label: string) => ReactElement | ReactElement[]
}

export type BodyRowType = {
  rowValue: Object
  rowLabel: {
    [key: string]: { label: string; value: string }
  }
}

interface TableStateType {
  direction: 'up' | 'down'
  items: BodyRowType[]
}

interface TableProps {
  getData: GetDataType
  headerRow: HeaderType[]
}

export type GetDataType = () => Promise<BodyRowType[]>

const initialTableSort: TableStateType = {
  items: [
    {
      rowLabel: {
        initialTableRow: { label: '', value: '' }
      },
      rowValue: []
    }
  ],
  direction: 'up'
}

const Table = ({ getData, headerRow }: TableProps) => {
  const [tableSort, setTableSort] = useState<TableStateType>(initialTableSort)

  const onTrClick = (data: BodyRowType) => {
    console.log(data)
  }

  const onThClick = (indexer: string) => {
    setTableSort(({ items, direction }) => {
      const sortabledItems = [...items]
      sortabledItems.sort((a, b) => {
        const valueA = a.rowLabel[indexer].value
        const valueB = b.rowLabel[indexer].value

        if (valueA < valueB) return direction === 'up' ? -1 : 1
        if (valueA > valueB) return direction === 'up' ? 1 : -1
        return 0
      })

      return {
        items: sortabledItems,
        direction: direction === 'up' ? 'down' : 'up'
      }
    })
  }

  const makeRequest = useCallback(async () => {
    const items = await getData()

    setTableSort(({ direction }) => ({ direction, items }))
  }, [getData])

  useEffect(() => {
    makeRequest()
  }, [makeRequest])

  return (
    <Style>
      <table>
        <thead>
          <tr>
            {headerRow.map(({ label, name, thWrapper }) =>
              thWrapper ? (
                <th onClick={() => onThClick(name)} key={name}>
                  {thWrapper(label)}
                </th>
              ) : (
                <th onClick={() => onThClick(name)} key={name}>
                  {label}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {tableSort.items?.map(({ rowLabel, rowValue }, trIndex) => (
            <tr key={trIndex} onClick={() => onTrClick({ rowLabel, rowValue })}>
              {headerRow.map(({ name, tdWrapper }, tdIndex) => {
                if (rowLabel[name])
                  return tdWrapper ? (
                    <td key={tdIndex}>{tdWrapper(rowLabel[name].label)}</td>
                  ) : (
                    <td key={tdIndex}>{rowLabel[name].label}</td>
                  )

                return (
                  <td key={tdIndex}>
                    <DotsLoader size={32} color='white' />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Style>
  )
}

export default Table
