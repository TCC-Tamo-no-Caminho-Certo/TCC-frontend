/* eslint-disable camelcase */
import React, { ChangeEvent, useEffect, useState } from 'react'
import Style, { Circle, RoleTd } from './styles'

import selectedRoleLabel from 'utils/makeRoleLabel'

import api from 'services/api'

import { Role } from 'store/user'

import ArrowIcon from 'assets/ArrowIcon'

import DotsLoader from 'components/DotsLoader'

export type StatusTypes = 'accepted' | 'rejected' | 'awaiting'

interface TableProps {
  headerData: { name: string; label: string }[]
  route: string
  dotsColor: string
}

interface RequestsData {
  request_id: number
  user_id: number
  role_id: number
  data: string
  status: StatusTypes
  full_name: string
  role: Role
  created_at: string
  updated_at?: string
}

interface TableData {
  statusCircle: StatusTypes
  status: string
  name: string
  role: Role
  date: string
  id: number
}

interface HeaderData {
  th: keyof TableData
  direction: 'ascending' | 'descending'
}

const initialHeaderData: HeaderData = {
  direction: 'ascending',
  th: 'name',
}

const filter = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.toLowerCase()
  const regexp = new RegExp(`^${value}`)

  const table = document.getElementById('table')
  const tr = table?.getElementsByTagName('tr')
  const td = table?.getElementsByTagName('td')

  const removeDisplay = (array: any[], regexP: RegExp): boolean => {
    for (let k = 0; k < array.length; k += 1)
      if (array[k].toLowerCase().search(regexP) > -1) return true

    return false
  }

  if (tr !== undefined && td !== undefined)
    for (let i = 0; i < tr.length; i += 1) {
      const tdsOfRow = []
      const numberOfColumns = td.length / tr.length

      for (let k = 0; k < numberOfColumns; k += 1) {
        const tdOfColumn = tr[i].getElementsByTagName('td')[k]
        tdsOfRow.push(tdOfColumn.innerHTML)
      }

      if (removeDisplay(tdsOfRow, regexp)) tr[i].style.display = ''
      else tr[i].style.display = 'none'
    }
}

const makeStatusLabel = (status: StatusTypes): string => {
  switch (status) {
    case 'accepted':
      return 'Aceito'
    case 'rejected':
      return 'Recusado'
    default:
      return 'Aguardando'
  }
}

const makeDateLabel = (date: string): string => {
  const teste = date.replaceAll('-', '/').split('')

  const month = {
    '01': 'jan',
    '02': 'fev',
    '03': 'mar',
    '04': 'mai',
    '05': 'abr',
    '06': 'jun',
    '07': 'jul',
    '08': 'ago',
    '09': 'set',
    '10': 'out',
    '11': 'nov',
    '12': 'dez',
  }

  const keyOfMonth = teste[5] + teste[6]

  return `${teste[8] + teste[9]} ${month[keyOfMonth as keyof typeof month]}`
}

const useSortableData = (items: TableData[] | null, config: HeaderData) => {
  const [sortConfig, setSortConfig] = useState(config)

  if (items === null) return { items: null, sort: null, sortConfig: null }

  const sortedItems = (): TableData[] => {
    const sortableItems = [...items]

    sortableItems.sort((a, b) => {
      const valueA = a[sortConfig.th]
      const valueB = b[sortConfig.th]

      if (valueA < valueB) return sortConfig.direction === 'ascending' ? -1 : 1
      if (valueA > valueB) return sortConfig.direction === 'descending' ? -1 : 1
      return 0
    })

    return sortableItems
  }

  const sort = (thToSort: keyof TableData) => {
    sortConfig.direction === 'ascending'
      ? setSortConfig({ th: thToSort, direction: 'descending' })
      : setSortConfig({ th: thToSort, direction: 'ascending' })
  }

  return { items: sortedItems(), sort, sortConfig }
}

const Table: React.FC<TableProps> = ({ headerData, route, dotsColor }) => {
  const [data, setData] = useState<TableData[] | null>(null)
  const [isClear, setIsClear] = useState(false)
  const { items, sort, sortConfig } = useSortableData(data, initialHeaderData)
  const [tablePage, setTablePage] = useState(1)

  const makeRequest = async (page: number) => {
    const element = document.getElementById('tableWrapper')

    if (element) {
      const limits = (element?.clientHeight / 32) * 2

      if (!isClear) {
        const { requests } = await api.get(`${route}/${page}/${limits}`)

        const tableData: TableData[] = requests.map(
          ({ status, full_name, role, created_at, request_id }: RequestsData) => {
            return {
              status: makeStatusLabel(status),
              role,
              statusCircle: status,
              name: full_name,
              date: makeDateLabel(created_at),
              id: request_id,
            }
          }
        )

        if (requests.length === 0) setIsClear(true)
        setData(before => (before === null ? tableData : [...before, ...tableData]))
      }
    }
  }

  const arrowAnimation = (thToAnimate: string) => {
    if (sortConfig === null) return { rotate: 0 }

    const direction = sortConfig.th === thToAnimate ? sortConfig.direction : undefined

    if (direction === 'ascending') return { rotate: -180 }
    if (direction === 'descending') return { rotate: 0 }
    return { rotate: -90 }
  }

  const onTableScroll = () => {
    const table = document.getElementById('tableWrapper')

    if (table !== null) {
      const condition = table.scrollHeight - table.scrollTop

      if (condition === table.clientHeight && !isClear) {
        setTablePage(tablePage + 1)
      }
    }
  }

  useEffect(() => {
    makeRequest(tablePage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablePage])

  return data !== undefined ? (
    <Style className='Table'>
      <input type='text' placeholder='Pesquisar' autoComplete='off' onChange={filter} />

      <table draggable='false'>
        <thead>
          <tr>
            {headerData.map(({ label, name }) => {
              if (name === 'statusCircle')
                return (
                  <th key={name} className='statusCircle'>
                    <button
                      type='button'
                      onClick={() => {
                        if (sort !== null) return sort(name as keyof TableData)
                        return ''
                      }}
                    >
                      <Circle />
                    </button>
                  </th>
                )

              return (
                <th key={name}>
                  <button
                    type='button'
                    onClick={() => {
                      if (sort !== null) return sort(name as keyof TableData)
                      return ''
                    }}
                  >
                    <ArrowIcon initial={{ rotate: -90 }} animate={arrowAnimation(name)} />
                    {label}
                  </button>
                </th>
              )
            })}
          </tr>
        </thead>
      </table>

      <div id='tableWrapper' onScroll={onTableScroll}>
        <table id='table' draggable='false'>
          <tbody>
            {items?.map(item => (
              <tr key={item.id}>
                {headerData.map(({ label, name }) => {
                  if (name === 'role')
                    return (
                      <RoleTd role={item[name]} key={item.id}>
                        {selectedRoleLabel(item[name])}
                      </RoleTd>
                    )

                  if (name === 'statusCircle')
                    return (
                      <td key={name} className='statusCircle'>
                        <Circle status={item.statusCircle} />
                      </td>
                    )

                  return <td key={label}>{item[name as keyof TableData]}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Style>
  ) : (
    <DotsLoader color={dotsColor} />
  )
}

export default Table
