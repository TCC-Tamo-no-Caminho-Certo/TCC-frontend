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
import useWindowDimensions from 'hooks/useWindowDimensions'

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
  name: string
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
    ({ status, name, role, created_at, request_id }: RequestsData) => ({
      role,
      id: request_id,
      name: name,
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
  const { innerWidth } = useWindowDimensions()
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

  const quantity = 10

  const makeRequest = useCallback(
    async (page: number) => {
      if (!isClear) {
        const response = await api.get(
          `user/role/requests?page=${page}&per_page=${quantity}`
        )
        const { requests } = response
        console.log(requests)

        if (requests && requests.length !== 0) {
          const tableData = transformArray(requests)

          setShowData(prev => (prev ? [...prev, ...tableData] : [...tableData]))
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

  const setLetterLimit = (word: string) => {
    if (innerWidth < 400) {
      const cut = word.substr(0, 10)
      const newWord = cut.split(' ')[0]
      return cut.split(' ')[1] ? newWord : newWord + '...'
    }

    if (innerWidth < 620 && innerWidth > 400) {
      const cut = word.substr(0, 20)
      const newWord = cut.split(' ')[0]
      return cut.split(' ')[1] ? newWord : newWord + '...'
    }

    if (innerWidth > 620 && innerWidth < 720) {
      const cut = word.substr(0, 30)
      const newWord = cut.split(' ')[0]
      return cut.split(' ')[1] ? newWord : newWord + '...'
    }
    if (innerWidth > 720 && innerWidth < 900) {
      const cut = word.substr(0, 40)
      const newWord = cut.split(' ')[0]
      return cut.split(' ')[1] ? newWord : newWord + '...'
    }

    return word.substr(0, 40)
  }

  useEffect(() => {
    makeRequest(1)
  }, [makeRequest])

  return (
    <>
      <Style className='Table'>
        <Form
          id='row'
          method='get'
          path={`user/role/requests?page=1&per_page=${quantity}&filter[full_name][]=Jean`}
          afterResData={res => {
            console.log(res)
            res !== undefined && setShowData(transformArray(res.requests))
          }}
        >
          <div id='filters'>
            <Text
              id='search'
              name='name'
              type='text'
              autoComplete='off'
              placeholder='Filtrar'
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

                    if (name === 'name')
                      return (
                        <td key={label} className='name'>
                          {setLetterLimit(
                            item[name as keyof TableData] as string
                          )}
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

      <Modal ref={modalRef} top='50vh' translateY='-50%'>
        <ModalContent
          role={clickedItem?.role}
          status={clickedItem?.statusCircle}
        >
          <CloseIcon onClick={() => modalRef.current?.toggleModal(false)} />

          <div id='avatarAndInfo'>
            <Avatar size={88} />

            <div id='info'>
              <div id='name'>{clickedItem?.name}</div>
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
