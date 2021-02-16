/* eslint-disable camelcase */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Style, { BodyWrapper, ModalContent, RoleTd } from './styles'

import Thead from './Thead'
import Circle from './Circle'

import makeRoleLabel from 'utils/makeRoleLabel'

import api from 'services/api'

import { Role } from 'store/user'
import { ThemeState } from 'store/theme'
import { RootState } from 'store'

import useSortableData from 'hooks/useSortableData'

import ArrowIcon from 'assets/ArrowIcon'
import LoupeIcon from 'assets/Inputs/LoupeIcon'
import CloseIcon from 'assets/Inputs/CloseIcon'

import Modal, { ModalMethods } from 'components/Modal'
import DotsLoader from 'components/DotsLoader'
import { Datepicker, Form, Submit, Text, Textarea } from 'components/Form'
import Avatar from 'components/User/Avatar'

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
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const tableRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const modalRef = useRef<ModalMethods>(null)

  const [clickedItem, setClickedItem] = useState<TableData | undefined>(undefined)
  const [isClear, setIsClear] = useState(false)
  const [tablePage, setTablePage] = useState(1)
  const [data, setData] = useState<TableData[] | null>(null)
  const [addData, setAddData] = useState<{ name: string } | undefined>(undefined)

  const { items, sort } = useSortableData(data, {
    direction: 'descending',
    indexer: 'name',
  })

  const quantity = 25

  const requestToTableData = (array: RequestsData[]) =>
    array.map(({ status, full_name, role, created_at, request_id }: RequestsData) => ({
      role,
      id: request_id,
      name: full_name,
      statusCircle: status,
      status: makeStatusLabel(status),
      date: makeDateLabel(created_at),
    }))

  const initialRequest = useCallback(async () => {
    if (!isClear) {
      const { requests } = await api.post(`request/role/get/1/${quantity}`, addData)

      if (requests !== undefined && requests.length !== 0) {
        const tableData = requestToTableData(requests)

        setData(before => (before ? [...before, ...tableData] : [...tableData]))
      } else setIsClear(true)
    }
  }, [addData, isClear])

  useEffect(() => {
    initialRequest()
  }, [initialRequest])

  useEffect(() => setIsClear(false), [addData])

  return (
    <>
      <Style className='Table'>
        <Form
          id='row'
          path={`request/role/get/${tablePage}/${quantity}`}
          afterResData={res => res !== undefined && setData(requestToTableData(res.requests))}
        >
          <div id='filters'>
            <Text
              id='search'
              name='name'
              type='text'
              autoComplete='off'
              placeholder='Filtrar'
              className='InputSearch'
              ref={inputRef}
            />

            {/* 
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

              <label htmlFor='to'> Até </label>

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
            */}
          </div>

          <button type='submit' id='searchButton'>
            <LoupeIcon />
            Buscar
          </button>
        </Form>

        <Thead headerData={headerData} sort={sort} />

        <BodyWrapper ref={tableRef}>
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
                          {makeRoleLabel(item[name])}
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
      </Style>

      <Modal ref={modalRef}>
        <ModalContent role={clickedItem?.role} status={clickedItem?.statusCircle}>
          <CloseIcon />

          <div id='avatarAndInfo'>
            <Avatar size={88} />

            <div id='info'>
              <div>{clickedItem?.name}</div>
              <div id='role'>{makeRoleLabel(clickedItem?.role as Role)}</div>
              <div id='status'>{clickedItem?.status}</div>
              <div>{clickedItem?.date}</div>
            </div>
          </div>

          <div id='doc' />

          <Form path='modal-path'>
            <Textarea
              id='feedback'
              name='feedback'
              placeholder='Se quiser digite uma resposta...'
            />

            <div id='buttons'>
              <Submit onClick={() => modalRef.current?.toggleModal(false)}>Aceitar</Submit>

              <button type='button' onClick={() => modalRef.current?.toggleModal(false)}>
                Recusar
              </button>
            </div>
          </Form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Table
