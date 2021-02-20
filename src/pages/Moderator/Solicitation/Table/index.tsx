/* eslint-disable camelcase */
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import Style, { BodyWrapper, ModalContent, RoleTd } from './styles'

import Thead from './Thead'
import Circle from './Circle'

import makeRoleLabel from 'utils/makeRoleLabel'

import api from 'services/api'

import { Role } from 'store/user'
import { ThemeState } from 'store/theme'
import { RootState } from 'store'

import useSortableData from 'hooks/useSortableData'

import Download from 'assets/Download'
import doc from 'assets/doc.jpg'
import LoupeIcon from 'assets/Inputs/LoupeIcon'
import CloseIcon from 'assets/Inputs/CloseIcon'

import Modal, { ModalMethods } from 'components/Modal'
import DotsLoader from 'components/DotsLoader'
import { Form, Submit, Text, Textarea } from 'components/Form'
import Avatar from 'components/User/Avatar'

import { useSelector } from 'react-redux'

export type StatusTypes = 'accepted' | 'rejected' | 'awaiting'
type TablePageType = TableData[] | null
type DataType = TableData | undefined

interface RequestsData {
  request_id: number
  user_id: number
  role_id: number
  showData: string
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

const transformArray = (array: RequestsData[]) => {
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
      10: 'out',
      11: 'nov',
      12: 'dez'
    }

    const keyOfMonth = teste[5] + teste[6]

    return `${teste[8] + teste[9]} ${month[keyOfMonth as keyof typeof month]}`
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

  return array.map(
    ({ status, full_name, role, created_at, request_id }: RequestsData) => ({
      role,
      id: request_id,
      name: full_name,
      statusCircle: status,
      status: makeStatusLabel(status),
      date: makeDateLabel(created_at)
    })
  )
}

const headerData: HeaderData[] = [
  { name: 'statusCircle', label: '' },
  { name: 'status', label: 'Status' },
  { name: 'name', label: 'Nome' },
  { name: 'role', label: 'Papel' },
  { name: 'date', label: 'Data' }
]

const Table = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const tableWrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const tableRef = useRef() as MutableRefObject<HTMLTableElement>
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>
  const modalRef = useRef<ModalMethods>(null)

  const [clickedItem, setClickedItem] = useState<DataType>(undefined)
  const [showData, setShowData] = useState<TablePageType>(null)
  const [tablePage, setTablePage] = useState(1)
  const [isClear, setIsClear] = useState(false)

  const { items, sort } = useSortableData(showData, {
    direction: 'descending',
    indexer: 'name'
  })

  const quantity = 20

  const makeRequest = useCallback(
    async (page: number) => {
      if (!isClear) {
        const { requests } = await api.post(
          `request/role/get/${page}/${quantity}`
        )

        if (requests && requests.length !== 0) {
          const tableData = transformArray(requests)

          setShowData(before =>
            before ? [...before, ...tableData] : [...tableData]
          )
        } else setIsClear(true)
      }
    },
    [isClear]
  )

  const onTableScroll = () => {
    const table = tableWrapperRef.current
    const element = tableRef.current

    if (table && element) {
      const maxHeight = table.clientHeight
      const position = Math.ceil(table.scrollHeight - table.scrollTop)

      if (position <= maxHeight) {
        makeRequest(tablePage + 1)
        setTablePage(tablePage + 1)
      }
    }
  }

  useEffect(() => {
    makeRequest(1)
  }, [makeRequest])

  useEffect(() => {
    console.log(showData)
  }, [showData])

  return (
    <>
      <Style className='Table'>
        <Form
          id='row'
          path={`request/role/get/1/${quantity}`}
          afterResData={res =>
            res !== undefined && setShowData(transformArray(res.requests))
          }
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
          </div>

          <button
            type='submit'
            id='searchButton'
            onClick={() => setTablePage(1)}
          >
            <LoupeIcon />
            Buscar
          </button>
        </Form>

        <Thead headerData={headerData} sort={sort} />

        <BodyWrapper ref={tableWrapperRef} onScroll={onTableScroll}>
          <table draggable='false' ref={tableRef}>
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
                    if (name === 'statusCircle')
                      return (
                        <td className='statusCircle' key={name}>
                          <Circle status={item.statusCircle} />
                        </td>
                      )

                    if (name === 'role')
                      return (
                        <RoleTd
                          className='role'
                          role={item[name]}
                          key={item.id}
                        >
                          {makeRoleLabel(item[name])}
                        </RoleTd>
                      )

                    if (name === 'status')
                      return (
                        <td key={label} className='status'>
                          {item[name as keyof TableData]}
                        </td>
                      )

                    return (
                      <td key={label} className={name}>
                        {item[name as keyof TableData]}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </BodyWrapper>

        {showData === null && <DotsLoader color={theme.colors.secondary} />}
      </Style>

      <Modal ref={modalRef}>
        <ModalContent
          role={clickedItem?.role}
          status={clickedItem?.statusCircle}
        >
          <CloseIcon onClick={() => modalRef.current?.toggleModal(false)} />

          <div id='avatarAndInfo'>
            <Avatar size={88} />

            <div id='info'>
              <div>{clickedItem?.name}</div>
              <div id='role'>{makeRoleLabel(clickedItem?.role as Role)}</div>
              <div id='status'>{clickedItem?.status}</div>
              <div>{clickedItem?.date}</div>
            </div>
          </div>

          <div id='doc'>
            <img src={doc} alt='doc' />
          </div>

          <a href={doc} download>
            <Download />
            Fazer download
          </a>

          <Form path='modal-path'>
            <Textarea
              id='feedback'
              name='feedback'
              placeholder='Se quiser, deixe uma resposta...'
            />

            <div id='buttons'>
              <Submit onClick={() => modalRef.current?.toggleModal(false)}>
                Aceitar
              </Submit>

              <button
                type='button'
                onClick={() => modalRef.current?.toggleModal(false)}
              >
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

/*
  useEffect(() => {
    console.table({
      clickedItem: clickedItem,
      isClear: isClear,
      tablePage: tablePage,
      filterData: filterData
    })
  }, [filterData, clickedItem, showData, isClear, items, tablePage])

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
*/
