import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import Style, { BodyWrapper, Filters, ResponseContent, RoleTd } from './styles'

import Thead from './Thead'
import Circle from './Circle'

import makeRoleLabel from 'utils/makeRoleLabel'
import { getStatusLabel, StatusTypes } from 'utils/status'
import { isoToDate } from 'utils/dates'

import api from 'services/api'

import { RootState } from 'store'
import { getRoles, Role, RolesState } from 'store/roles'
import { ThemeState } from 'store/theme'

import useSortableData from 'hooks/useSortableData'

import LoupeIcon from 'assets/Inputs/LoupeIcon'
import CloseIcon from 'assets/Inputs/CloseIcon'

import ResponseModal, { ModalMethods } from 'components/Modal'
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
import Popup, { PopupMethods } from 'components/Popup'

import { lighten } from 'polished'
import { useDispatch, useSelector } from 'react-redux'
import { Theme } from 'react-select'
import * as Yup from 'yup'

export interface TableData {
  role: Role
  id: number
  name: string
  date: string
  status: string
  statusCircle: StatusTypes
  docId?: string
  feedback?: string
}

interface RequestsData {
  role: Role
  name: string
  user_id: number
  role_id: number
  request_id: number
  created_at: string
  status: StatusTypes
  voucher_uuid?: string
  feedback?: string
  data: {
    semester: number
    course_id: number
    campus_id: number
  }
}

interface TableState {
  isClear: boolean
  tablePage: number
  clickedDoc: string
  filter: keyof Filter
  showData: TableData[] | null
  clickedItem: TableData | undefined
}

interface Filter {
  role: JSX.Element
  date: JSX.Element
  name: JSX.Element
}

export interface HeaderData {
  label: string
  name: keyof TableData
}

const headerData: HeaderData[] = [
  { name: 'statusCircle', label: '' },
  { name: 'status', label: 'Status' },
  { name: 'name', label: 'Nome' },
  { name: 'role', label: 'Papel' },
  { name: 'date', label: 'Data' }
]

const transformArray = (array: RequestsData[]): TableData[] =>
  array.map(
    ({
      name,
      role,
      status,
      voucher_uuid,
      created_at,
      request_id,
      feedback
    }) => ({
      role,
      feedback,
      name: name,
      docId: voucher_uuid,
      id: request_id,
      statusCircle: status,
      status: getStatusLabel(status),
      date: isoToDate(created_at, 'day/month')
    })
  )

const Table = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const roles = useSelector<RootState, RolesState>(state => state.roles)
  const tableWrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const tableRef = useRef() as MutableRefObject<HTMLTableElement>
  const modalRef = useRef<ModalMethods>(null)
  const popupRef = useRef<PopupMethods>(null)
  const selectRef = useRef<any>(null)
  const dispatch = useDispatch()
  const [buttonClicked, setButtonClicked] = useState('rejected')
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

  const quantity = 1
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
  const selectTheme = (beforeTheme: Theme) => ({
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
  const filters: Filter = {
    name: (
      <Text
        name='name'
        type='text'
        autoComplete='off'
        placeholder='Filtrar'
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
        ref={selectRef}
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

  const makeRequest = useCallback(
    async (page: number) => {
      if (!isClear) {
        const { requests } = await api.get(
          `user/role/requests?page=${page}&per_page=${quantity}`
        )

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

  const setClicked = async (item: TableData) => {
    console.log(item.docId)
    const voucher = await api.get(`user/role/request/voucher/${item.docId}`)

    setTableState(prev => ({
      ...prev,
      clickedItem: item,
      clickedDoc: voucher.url
    }))
  }

  const filterTable = async (value: any) => {
    if (value.name) {
      const response = await api.get(
        `user/role/requests?page=1&per_page=${quantity}&filter[full_name][]=${value.name}`
      )

      const { requests } = response

      console.log('tst', requests)

      setTableState(prev => ({
        ...prev,
        showData: requests,
        tablePage: 1
      }))
    }

    if (value.role) {
      const roleId = roles.roles.filter(({ title }) => value.role === title)[0]
        .role_id

      const response = await api.get(
        `user/role/requests?page=1&per_page=${quantity}&filter[role_id][]=${roleId}`
      )

      const { requests } = response

      setTableState(prev => ({
        ...prev,
        showData: requests,
        tablePage: 1
      }))
    }
  }

  const onResponseSubmit = (res: any) => {
    if (res.success)
      popupRef.current?.configPopup({
        type: 'success',
        message: 'Resposta enviada',
        onClick: () => modalRef.current?.toggleModal()
      })

    popupRef.current?.configPopup({
      type: 'error',
      message: 'Algo deu errado',
      onClick: () => modalRef.current?.toggleModal()
    })
  }

  useEffect(() => {
    makeRequest(1)
  }, [makeRequest])

  useEffect(() => {
    dispatch(getRoles())
  }, [dispatch])

  return (
    <>
      <Style className='Table'>
        <Filters getData={filterTable}>
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

          <button type='submit' className='Submit'>
            <LoupeIcon />
            Buscar
          </button>
        </Filters>

        <Thead headerData={headerData} sort={sort} />

        <BodyWrapper ref={tableWrapperRef} onScroll={onTableScroll}>
          <table draggable='false' ref={tableRef}>
            <tbody>
              {items?.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    modalRef.current?.toggleModal(true)
                    setClicked(item)
                  }}
                >
                  {headerData.map(({ label, name }) => {
                    if (name === 'role')
                      return (
                        <RoleTd className='role' role={item[name]} key={index}>
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

      <ResponseModal top='50vh' translateY='-50%' ref={modalRef}>
        <ResponseContent
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
              <div>Falta isso</div>
            </div>

            <div className='field'>
              Curso:
              <div>Falta isso</div>
            </div>

            <div className='field'>
              Data:
              <div>{clickedItem?.date}</div>
            </div>
          </div>

          {clickedItem?.role !== 'student' ? (
            <div id='doc'>
              <iframe src={clickedDoc} />
            </div>
          ) : (
            <div id='feedback'>
              Justificativa:
              <p>
                asdasdasdasdasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
              </p>
            </div>
          )}

          <div id='radios'>
            <div>
              <input
                name='response'
                value='accept'
                type='radio'
                id='accept'
                onChange={(e: any) => {
                  e.target.checked && setButtonClicked('accepted')
                }}
              />
              <label htmlFor='accept' id='acceptLabel'>
                Aceitar
              </label>
            </div>

            <div>
              <input
                name='response'
                value='reject'
                type='radio'
                id='reject'
                defaultChecked
                onChange={(e: any) => {
                  e.target.checked && setButtonClicked('rejected')
                }}
              />
              <label htmlFor='reject' id='rejectLabel'>
                Recusar
              </label>
            </div>
          </div>

          <Form
            loading
            method='patch'
            schema={
              buttonClicked === 'rejected'
                ? Yup.object({
                    feedback: Yup.string().required(
                      'Ao recusar deve-se enviar uma justificativa'
                    )
                  })
                : Yup.object({
                    feedback: Yup.string()
                  })
            }
            afterResData={onResponseSubmit}
            addDataToPath={[`${clickedItem?.id}`]}
            path={
              buttonClicked === 'rejected'
                ? 'user/role/request/reject/*%'
                : 'user/role/request/accept/*%'
            }
          >
            <Textarea
              id='feedback'
              name='feedback'
              placeholder='Deixe uma resposta...'
              maxLength={500}
            />

            <Submit>Enviar resposta</Submit>
          </Form>
        </ResponseContent>
      </ResponseModal>

      <Popup
        bottom='50vh'
        translateY='50%'
        bgHeight={'100vh'}
        ref={popupRef}
        zIndex={20}
      />
    </>
  )
}

export default Table
