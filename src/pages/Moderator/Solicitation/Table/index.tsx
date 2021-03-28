import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import Style, { BodyWrapper, Filters, ModalContent, RoleTd } from './styles'

import Thead from './Thead'
import Circle from './Circle'

import makeRoleLabel from 'utils/makeRoleLabel'

import api from 'services/api'

import { Role } from 'store/user'
import { ThemeState } from 'store/theme'
import { RootState } from 'store'

import useSortableData from 'hooks/useSortableData'

import LoupeIcon from 'assets/Inputs/LoupeIcon'
import CloseIcon from 'assets/Inputs/CloseIcon'

import Modal, { ModalMethods } from 'components/Modal'
import DotsLoader from 'components/DotsLoader'
import {
  Datepicker,
  Form,
  Select,
  Submit,
  Text,
  Textarea
} from 'components/Form'
import Avatar from 'components/User/Avatar'
import { valueToDate } from 'components/Form/Datepicker'

import { lighten } from 'polished'
import { useSelector } from 'react-redux'
import { Theme } from 'react-select'

export type StatusTypes = 'accepted' | 'rejected' | 'awaiting'

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
  doc_uuid?: string
}

export interface TableData {
  statusCircle: StatusTypes
  status: string
  name: string
  role: Role
  date: string
  id: number
  doc?: string
}

export interface HeaderData {
  name: keyof TableData
  label: string
}

const transformArray = (array: RequestsData[]): TableData[] => {
  const _makeDateLabel = (date: string): string => {
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

  const formatterDate = (date: string) => {
    const date1 = valueToDate(date).split('/')[0]
    const date2 = valueToDate(date).split('/')[1]
    return date1 + '/' + date2
  }

  return array.map(
    ({
      status,
      name,
      role,
      created_at,
      request_id,
      doc_uuid
    }: RequestsData) => {
      return {
        role,
        doc: doc_uuid,
        id: request_id,
        name: name,
        statusCircle: status,
        status: makeStatusLabel(status),
        date: formatterDate(created_at)
      }
    }
  )
}

const headerData: HeaderData[] = [
  { name: 'statusCircle', label: '' },
  { name: 'status', label: 'Status' },
  { name: 'name', label: 'Nome' },
  { name: 'role', label: 'Papel' },
  { name: 'date', label: 'Data' }
]

interface TableState {
  isClear: boolean
  tablePage: number
  clickedDoc: string
  filter: keyof Filter
  showData: TableData[] | null
  clickedItem: TableData | undefined
}

interface Filter {
  name: JSX.Element
  role: JSX.Element
  date: JSX.Element
}

const Table = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const tableWrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const tableRef = useRef() as MutableRefObject<HTMLTableElement>
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>
  const modalRef = useRef<ModalMethods>(null)
  const [
    { clickedItem, clickedDoc, showData, tablePage, isClear, filter },
    setTableState
  ] = useState<TableState>({
    clickedItem: undefined,
    showData: null,
    tablePage: 1,
    isClear: false,
    filter: 'name',
    clickedDoc: ''
  })
  const { items, sort } = useSortableData(showData, {
    direction: 'descending',
    indexer: 'name'
  })

  const quantity = 60

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

          setTableState(prev => ({
            ...prev,
            showData: prev.showData
              ? [...prev.showData, ...tableData]
              : [...tableData]
          }))
        } else setTableState(prev => ({ ...prev, setIsClear: true }))
      }
    },
    [isClear]
  )

  const selectStyle = {
    container: (before: any) => ({
      ...before
    }),
    menu: (before: any) => ({
      ...before,
      zIndex: 3,
      backgroundColor: theme.colors.primary,
      color: theme.colors.secondary,
      border: `solid ${theme.colors.secondary} 1px`
    }),
    control: (before: any) => ({
      ...before,
      paddingLeft: 8,
      backgroundColor: 'transparent',
      border: `solid ${theme.colors.secondary} 1px`,
      ':hover': {
        border: `solid ${theme.colors.secondary} 1px`
      }
    }),
    valueContainer: (before: any) => ({
      ...before,
      paddingLeft: 0,
      backgroundColor: 'transparent'
    }),
    singleValue: (before: any) => ({
      ...before,
      color: theme.colors.secondary
    }),
    multiValue: (before: any) => ({
      ...before,
      backgroundColor: theme.colors.primary
    }),
    multiValueLabel: (before: any) => ({
      ...before,
      color: theme.colors.secondary
    }),
    multiValueRemove: (before: any) => ({
      ...before,
      color: theme.colors.secondary
    })
  }

  const selectTheme = (beforeTheme: Theme): Theme => ({
    ...beforeTheme,
    colors: {
      ...beforeTheme.colors,
      danger: theme.colors.red,
      dangerLight: lighten(0.5, theme.colors.red),
      primary: theme.colors.tertiary,
      primary25: lighten(0.1, theme.colors.tertiary),
      primary50: lighten(0.2, theme.colors.tertiary),
      primary75: lighten(0.3, theme.colors.tertiary),
      neutral0: theme.colors.secondary,
      neutral5: theme.colors.secondary,
      neutral10: theme.colors.secondary,
      neutral20: theme.colors.secondary,
      neutral30: theme.colors.secondary,
      neutral40: theme.colors.secondary,
      neutral50: theme.colors.secondary,
      neutral60: theme.colors.secondary,
      neutral70: theme.colors.secondary,
      neutral80: theme.colors.secondary,
      neutral90: theme.colors.secondary
    }
  })

  const onTableScroll = () => {
    const table = tableWrapperRef.current
    const element = tableRef.current

    if (table && element) {
      const maxHeight = table.clientHeight
      const position = Math.ceil(table.scrollHeight - table.scrollTop)

      if (position <= maxHeight) {
        makeRequest(tablePage + 1)
        setTableState(prev => ({ ...prev, tablePage: prev.tablePage + 1 }))
      }
    }
  }

  const onSearchClick = async () => {
    const value = inputRef.current.value

    const { requests } = await api.get(
      `user/role/requests?page=1&per_page=${quantity}&filter[full_name][]=${value}`
    )

    setTableState(prev => ({ ...prev, showData: requests, tablePage: 1 }))
  }

  const setClicked = async (item: TableData) => {
    const { url } = await api.get(`user/role/request/doc/${item.doc}`)

    setTableState(prev => ({
      ...prev,
      clickedItem: item,
      clickedDoc: `https://s3.steamslab.com/documents${
        url.split('/documents')[1]
      }`
    }))
  }

  useEffect(() => {
    makeRequest(1)
  }, [makeRequest])

  const filters: Filter = {
    name: (
      <Text
        name='name'
        type='text'
        autoComplete='off'
        placeholder='Filtrar'
        ref={inputRef}
        textColors={{
          focused: theme.colors.secondary,
          unfocused: theme.colors.secondary
        }}
      />
    ),
    role: (
      <Select
        name='role'
        className='SelectRole'
        theming={selectTheme}
        styling={selectStyle}
        options={[
          { label: 'Estudante', value: 'student' },
          { label: 'Moderador', value: 'moderator' }
        ]}
      />
    ),
    date: (
      <div id='dates'>
        <Datepicker
          placeholder='De'
          dateColors={{
            body: theme.colors.secondary,
            header: theme.colors.primary,
            selected: theme.colors.tertiary,
            disabled: theme.colors.red
          }}
          textColors={{
            focused: theme.colors.secondary,
            unfocused: theme.colors.secondary
          }}
        />

        <Datepicker
          placeholder='Até'
          dateColors={{
            body: theme.colors.secondary,
            header: theme.colors.primary,
            selected: theme.colors.tertiary,
            disabled: theme.colors.red
          }}
          textColors={{
            focused: theme.colors.secondary,
            unfocused: theme.colors.secondary
          }}
        />
      </div>
    )
  }

  return (
    <>
      <Style className='Table'>
        <Filters>
          {filters[filter]}

          <Select
            name='filter'
            className='SelectFilter'
            theming={selectTheme}
            styling={selectStyle}
            defaultValue={{ label: 'Nome', value: 'name' }}
            options={[
              { label: 'Papel', value: 'role' },
              { label: 'Nome', value: 'name' },
              { label: 'Data', value: 'date' }
            ]}
            onChange={({ value }: any) =>
              setTableState(prev => ({ ...prev, filter: value }))
            }
          />

          <button className='Submit' onClick={onSearchClick} type='button'>
            <LoupeIcon />
            Buscar
          </button>
        </Filters>

        <Thead headerData={headerData} sort={sort} />

        <BodyWrapper ref={tableWrapperRef} onScroll={onTableScroll}>
          <table draggable='false' ref={tableRef}>
            <tbody>
              {items?.map(item => (
                <tr
                  key={item.id}
                  onClick={() => {
                    modalRef.current?.toggleModal(true)
                    setClicked(item)
                  }}
                >
                  {headerData.map(({ label, name }) => {
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
                    if (name === 'statusCircle')
                      return (
                        <td className='statusCircle' key={name}>
                          <Circle status={item.statusCircle} />
                        </td>
                      )

                    return (
                      <td key={label} className={name}>
                        {item[name]}
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

      <Modal top='50vh' translateY='-50%' ref={modalRef}>
        <ModalContent
          role={clickedItem?.role}
          status={clickedItem?.statusCircle}
        >
          <CloseIcon onClick={() => modalRef.current?.toggleModal(false)} />
          <div id='info'>
            <div id='title'>Informações</div>

            <hr />

            <div className='field' id='avatar'>
              <Avatar size={120} />
            </div>

            <div className='field'>
              Nome:
              <div>{clickedItem?.name}</div>
            </div>

            <div className='field'>
              Papel:
              <div id='role'>{makeRoleLabel(clickedItem?.role as Role)}</div>
            </div>

            <div className='field'>
              Status:
              <div id='status'>{clickedItem?.status}</div>
            </div>

            <div className='field'>
              Email:
              <div>miguelandradebarreto2@gmail.com</div>
            </div>

            <div className='field'>
              Curso:
              <div>Engenharia da computação</div>
            </div>

            <div className='field'>
              Data:
              <div>{clickedItem?.date}</div>
            </div>
          </div>

          <div id='doc'>
            <iframe src={clickedDoc} />
          </div>

          <Form
            method='patch'
            path='user/role/request/accept/*%'
            addDataToPath={[`${clickedItem?.id}`]}
          >
            <Textarea
              id='feedback'
              name='feedback'
              placeholder='Se quiser, deixe uma resposta...'
              maxLength={500}
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
