/* eslint-disable camelcase */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Style, { BodyWrapper, RoleTd } from './styles'

import Thead from './Thead'
import Circle from './Circle'

import selectedRoleLabel from 'utils/makeRoleLabel'

import api from 'services/api'

import { Role } from 'store/user'
import { ThemeState } from 'store/theme'
import { RootState } from 'store'

import useSortableData from 'hooks/useSortableData'

import ArrowIcon from 'assets/ArrowIcon'
import LoupeIcon from 'assets/Inputs/LoupeIcon'

import Modal, { ModalMethods } from 'components/Modal'
import Text from 'components/Form/Text'
import DotsLoader from 'components/DotsLoader'
import { Datepicker } from 'components/Form'

import { useSelector } from 'react-redux'

export type StatusTypes = 'accepted' | 'rejected' | 'awaiting'

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

export interface TableData {
  statusCircle: StatusTypes
  status: string
  name: string
  role: Role
  date: string
  id: number
}

export interface HeaderData {
  name: keyof TableData
  label: string
}

const headerData: HeaderData[] = [
  { name: 'statusCircle', label: '' },
  { name: 'name', label: 'Nome' },
  { name: 'role', label: 'Papel' },
  { name: 'status', label: 'Status' },
  { name: 'date', label: 'Data' },
]

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

const Table: React.FC = () => {
  const tableRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const modalRef = useRef<ModalMethods>(null)

  const [clickedItem, setClickedItem] = useState<TableData | undefined>(undefined)
  const [isClear, setIsClear] = useState(false)
  const [tablePage, setTablePage] = useState(1)
  const [data, setData] = useState<TableData[] | null>(null)
  const [addData, setAddData] = useState<{ name: string } | undefined>(undefined)

  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const { items, sort } = useSortableData(data, {
    direction: 'descending',
    indexer: 'name',
  })

  const quantity = 25

  const makeRequest = useCallback(
    async (page: number, limit: number) => {
      if (!isClear) {
        const { requests } = await api.post(`request/role/get/${page}/${limit}`, addData)

        if (requests !== undefined) {
          if (requests.length !== 0) {
            const tableData = requests.map(
              ({ status, full_name, role, created_at, request_id }: RequestsData) => {
                return {
                  role,
                  id: request_id,
                  name: full_name,
                  statusCircle: status,
                  status: makeStatusLabel(status),
                  date: makeDateLabel(created_at),
                }
              }
            )

            setTablePage(before => before + 1)
            setData(before => (before ? [...before, ...tableData] : tableData))
          } else {
            setIsClear(true)
          }
        }
      }
    },
    [addData, isClear]
  )

  const onSearchClick = () => {
    const { value } = inputRef.current

    if (value === undefined || value === '') {
      setAddData(before => {
        if (before !== undefined) setData([])
        return undefined
      })
    } else {
      setAddData(before => {
        if (before?.name !== value) {
          setData([])
          return { name: value }
        }

        return before
      })
    }
  }

  const onScroll = () => {
    const element = tableRef.current

    if (element !== undefined && element !== null) {
      const a = element.scrollTop
      const b = element.scrollHeight - element.clientHeight
      const maxScroll = a / b

      if (maxScroll === 1) {
        makeRequest(tablePage, quantity)
      }
    }
  }

  useEffect(() => {
    makeRequest(1, quantity)
  }, [makeRequest])

  useEffect(() => setIsClear(false), [addData])

  return (
    <Style className='Table'>
      <div id='row'>
        <div id='filters'>
          <Text
            id='search'
            type='text'
            autoComplete='off'
            placeholder='Filtrar'
            className='InputSearch'
            ref={inputRef}
            onKeyPress={e => e.key === 'Enter' && onSearchClick()}
          />

          <div id='dates'>
            <label htmlFor='from'>De</label>
            <Datepicker
              name='from'
              icon={ArrowIcon}
              headerColor={theme.colors.primary}
              bodyColor={theme.colors.secondary}
              selectedColor={theme.colors.tertiary}
              disabledColor={theme.colors.red}
              valueColor={theme.colors.secondary}
            />

            <label htmlFor='to'>Até</label>
            <Datepicker
              name='to'
              icon={ArrowIcon}
              valueColor={theme.colors.secondary}
              headerColor={theme.colors.primary}
              bodyColor={theme.colors.secondary}
              selectedColor={theme.colors.tertiary}
              disabledColor={theme.colors.red}
            />
          </div>
        </div>

        <button type='button' onClick={onSearchClick} id='searchButton'>
          <LoupeIcon />
          Buscar
        </button>
      </div>

      <Thead headerData={headerData} sort={sort} />

      <BodyWrapper ref={tableRef} onScroll={onScroll}>
        <table draggable='false'>
          <tbody>
            {items?.map(item => (
              <tr
                key={item.id}
                onClick={() => {
                  modalRef.current?.toggleModal(true)
                  setClickedItem(item)
                }}
              >
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
      </BodyWrapper>

      {data === null && <DotsLoader color={theme.colors.secondary} />}

      <Modal ref={modalRef}>
        <div id='content'>
          <div>{`Nome: ${clickedItem?.name}`}</div>

          <button
            type='button'
            style={{ color: 'white' }}
            onClick={() => modalRef.current?.toggleModal(false)}
          >
            Fechar
          </button>
        </div>
      </Modal>
    </Style>
  )
}

export default Table
