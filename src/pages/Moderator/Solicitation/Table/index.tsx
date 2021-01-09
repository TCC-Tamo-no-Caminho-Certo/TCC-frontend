import React, { ChangeEvent, useMemo, useState } from 'react'
import Style from './styles'

import ArrowIcon from 'assets/ArrowIcon'

interface TableProps {
  headerData: string[]
  data: Object[]
}

const useSortableData = (items: any[], config: { th: string; direction: string }) => {
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

  const sort = (th: any) => {
    if (sortConfig && sortConfig.th === th && sortConfig.direction === 'ascending')
      setSortConfig({ th, direction: 'descending' })
    else setSortConfig({ th, direction: 'ascending' })
  }

  return { items: sortedItems, sort, sortConfig }
}

const Table: React.FC<TableProps> = ({ headerData, data }) => {
  const { items, sort, sortConfig } = useSortableData(data, {
    direction: '',
    th: '',
  })

  const arrowAnimation = (th: string) => {
    const direction = sortConfig.th === th ? sortConfig.direction : undefined

    if (direction === 'ascending') return { rotate: -180 }
    if (direction === 'descending') return { rotate: 0 }
    return { rotate: -90 }
  }

  function filter(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toLowerCase()
    const table = document.getElementById('table')
    const tr = table?.getElementsByTagName('tr')
    const td = table?.getElementsByTagName('td')

    const removeDisplay = (array: any[]) => {
      for (let k = 0; k < array.length; k += 1) {
        if (array[k].toLowerCase().search(value) > -1) return true
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
    <Style>
      <input type='text' onChange={filter} placeholder='Pesquisar' autoComplete='off' />

      <table id='table'>
        <thead>
          <tr draggable='false'>
            {headerData.map(th => (
              <th key={th} onClick={() => sort(th)}>
                <div>
                  <ArrowIcon initial={{ rotate: -90 }} animate={arrowAnimation(th)} />
                  {th}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              {headerData.map(th => (
                <td key={item[th]}>{item[th]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Style>
  )
}

export default Table
