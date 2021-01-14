import React, { ChangeEvent, useMemo, useState } from 'react'
import Style, { Circle, RoleTd } from './styles'

import selectedRoleLabel from 'utils/selectedRoleLabel'

import { Role } from 'store/user'

import ArrowIcon from 'assets/ArrowIcon'

export type StatusTypes = 'accepted' | 'rejected' | 'awaiting'

export interface RequestData {
  statusCircle: StatusTypes
  status: string
  name: string
  role: Role
  date: string
  id: number
}

interface TableProps {
  headerData: { name: string; label: string }[]
  data: RequestData[]
}

const useSortableData = (
  items: RequestData[],
  config: { th: keyof RequestData; direction: string }
) => {
  const [sortConfig, setSortConfig] = useState(config)

  const sortedItems = useMemo(() => {
    const sortableItems = [...items]

    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const valueA = a[sortConfig.th]
        const valueB = b[sortConfig.th]

        if (valueA < valueB) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }

        if (valueA > valueB) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }

        return 0
      })
    }

    return sortableItems
  }, [items, sortConfig])

  const sort = (th: keyof RequestData) => {
    if (sortConfig && sortConfig.th === th && sortConfig.direction === 'ascending')
      setSortConfig({ th, direction: 'descending' })
    else setSortConfig({ th, direction: 'ascending' })
  }

  return { items: sortedItems, sort, sortConfig }
}

const Table: React.FC<TableProps> = ({ headerData, data }) => {
  const { items, sort, sortConfig } = useSortableData(data, {
    direction: '',
    th: 'name',
  })

  const arrowAnimation = (th: string) => {
    const direction = sortConfig.th === th ? sortConfig.direction : undefined

    if (direction === 'ascending') return { rotate: -180 }
    if (direction === 'descending') return { rotate: 0 }
    return { rotate: -90 }
  }

  const filter = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    const regex = new RegExp(`^${value}`)
    const table = document.getElementById('table')
    const tr = table?.getElementsByTagName('tr')
    const td = table?.getElementsByTagName('td')

    const removeDisplay = (array: any[]) => {
      for (let k = 0; k < array.length; k += 1) {
        if (array[k].toLowerCase().search(regex) > -1) return true
      }

      return false
    }

    if (tr !== undefined && td !== undefined) {
      for (let i = 1; i < tr?.length; i += 1) {
        const tdsToCheck = []

        for (let k = 0; k < td.length / tr.length; k += 1) {
          if (tr[i].getElementsByTagName('td')[k] !== undefined)
            tdsToCheck.push(tr[i].getElementsByTagName('td')[k].innerHTML)
        }

        if (removeDisplay(tdsToCheck)) tr[i].style.display = ''
        else tr[i].style.display = 'none'
      }
    }
  }

  return (
    <Style className='Table'>
      <input type='text' onChange={filter} placeholder='Pesquisar' autoComplete='off' />

      <table>
        <thead>
          <tr draggable='false'>
            {headerData.map(({ label, name }) => {
              if (name !== 'statusCircle') {
                return (
                  <th key={name}>
                    <button type='button' onClick={() => sort(name as keyof RequestData)}>
                      <ArrowIcon initial={{ rotate: -90 }} animate={arrowAnimation(name)} />
                      {label}
                    </button>
                  </th>
                )
              }

              return (
                <th key={name} className='statusCircle'>
                  <button type='button' onClick={() => sort(name as keyof RequestData)}>
                    <Circle />
                  </button>
                </th>
              )
            })}
          </tr>
        </thead>
      </table>

      <div id='tableWrapper'>
        <table id='table'>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                {headerData.map(({ label, name }) => {
                  if (name === 'role')
                    return (
                      <RoleTd role={item[name]} key={label}>
                        {selectedRoleLabel(item[name])}
                      </RoleTd>
                    )
                  if (name !== 'statusCircle')
                    return <td key={label}>{item[name as keyof RequestData]}</td>

                  return (
                    <td key={name} className='statusCircle'>
                      <Circle status={item.statusCircle} />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Style>
  )
}

export default Table
