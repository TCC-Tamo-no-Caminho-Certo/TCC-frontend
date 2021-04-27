import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import Style, { Table } from './styles'

import Filters from './Filters'
import Tbody from './Tbody'
import Thead from './Thead'

import { StatusTypes } from 'utils/status'

import { getRoles, Role, RolesState } from 'store/Async/roles'
import { RootState } from 'store'
import { CoursesState, getCourses } from 'store/Async/courses'

import useSortableData from 'hooks/useSortableData'

import DotsLoader from 'components/DotsLoader'

import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'

export interface ItemData {
  id: number
  role: Role
  name: string
  date: string
  status: string
  docId?: string
  orcid?: string
  user_id: number
  lattes?: string
  pretext?: string
  feedback?: string
  linkedin?: string
  course_id?: number
  voucherUrl?: string
  statusCircle: StatusTypes
}

interface RequestsContextProps {
  quantity: number
  tableState: TableState
  setTableState: Dispatch<SetStateAction<TableState>>
}

interface TableState {
  tablePage: number
  showData?: ItemData[]
}

export interface HeaderData {
  label: string
  name: keyof ItemData
}

const headerData: HeaderData[] = [
  { name: 'statusCircle', label: '' },
  { name: 'status', label: 'Status' },
  { name: 'name', label: 'Nome' },
  { name: 'role', label: 'Papel' },
  { name: 'date', label: 'Data' }
]

export const RequestsContext = createContext<RequestsContextProps>({
  quantity: 0,
  tableState: {
    tablePage: 1,
    showData: undefined
  },
  setTableState: () => {}
})

const Requests = () => {
  const theme = useContext(ThemeContext)
  const roles = useSelector<RootState, RolesState>(({ roles }) => roles)
  const courses = useSelector<RootState, CoursesState>(({ courses }) => courses)

  const [tableState, setTableState] = useState<TableState>({
    tablePage: 1,
    showData: undefined
  })

  const { items, sort } = useSortableData(tableState.showData, {
    indexer: 'name',
    direction: 'descending'
  })

  const dispatch = useDispatch()

  const quantity = 50
  const condition = roles.roles.length !== 0 && courses.courses.length !== 0

  useEffect(() => {
    dispatch(getRoles(roles))
    dispatch(getCourses(courses))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Style>
      <header>
        <h1>Solicitações</h1>
      </header>

      {condition ? (
        <RequestsContext.Provider
          value={{
            quantity,
            tableState,
            setTableState
          }}
        >
          <Table>
            <Filters />

            <Thead headerData={headerData} sort={sort} />

            {!tableState.showData && (
              <div className='loader'>
                <DotsLoader color={theme.colors.secondary} />
              </div>
            )}

            <Tbody headerData={headerData} items={items} />
          </Table>
        </RequestsContext.Provider>
      ) : (
        <div className='loader'>
          <DotsLoader color={theme.colors.secondary} />
        </div>
      )}
    </Style>
  )
}

export default Requests
