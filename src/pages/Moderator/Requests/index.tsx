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

import { getRoles, Role, RolesState, RoleType } from 'store/AsyncThunks/roles'
import { RootState } from 'store'
import { Course, CoursesState, getCourses } from 'store/AsyncThunks/courses'

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
  user_id: number
  statusCircle: StatusTypes
  docId?: string
  course_id?: number
  feedback?: string
  pretext?: string
  voucherUrl?: string
}

interface RequestsContextProps {
  setTableState: Dispatch<SetStateAction<TableState>>
  courses: Course[]
  roles: RoleType[]
  tableState: TableState
}

interface TableState {
  tablePage: number
  showData: ItemData[] | undefined
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
  roles: [],
  courses: [],
  setTableState: () => {},
  tableState: {
    tablePage: 1,
    showData: undefined
  }
})

const Requests = () => {
  const theme = useContext(ThemeContext)

  const courses = useSelector<RootState, CoursesState>(state => state.courses)
  const roles = useSelector<RootState, RolesState>(state => state.roles)

  const [tableState, setTableState] = useState<TableState>({
    showData: undefined,
    tablePage: 1
  })

  const { items, sort } = useSortableData(tableState.showData, {
    direction: 'descending',
    indexer: 'name'
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
            tableState,
            setTableState,
            roles: roles.roles,
            courses: courses.courses
          }}
        >
          <Table className='Table'>
            <Filters quantity={quantity} />

            <Thead headerData={headerData} sort={sort} />

            {!tableState.showData && (
              <div className='loader'>
                <DotsLoader color={theme.colors.secondary} />
              </div>
            )}

            <Tbody headerData={headerData} items={items} quantity={quantity} />
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
