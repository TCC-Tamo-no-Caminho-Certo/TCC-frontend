import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import Style from './styles'

import Filters from './Filters'
import Tbody from './Tbody'
import Thead from './Thead'

import { getRoles, RolesState } from 'store/Async/roles'
import { RootState } from 'store'
import { CoursesState, getCourses } from 'store/Async/courses'

import useSortableData from 'hooks/useSortableData'

import DotsLoader from 'components/DotsLoader'

import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'

export interface HeaderData {
  label: string
  name: any
  role?: boolean
  circle?: boolean
  dataManipulation?: (_data: any) => string
}

interface TableContextProps {
  path: string
  quantity: number
  tableState: TableState
  headerData: HeaderData[]
  setTableState: Dispatch<SetStateAction<TableState>>
}

interface TableState {
  tablePage: number
  showData?: any[]
}

export interface ItemProps {
  userInfo?: any
  selectedInfo?: any
  onCloseClick: () => void
}

interface TableProps {
  path: string
  headerData: HeaderData[]
  itemComponent: (_props: ItemProps) => JSX.Element
  quantity?: number
}

export const TableContext = createContext<TableContextProps>({
  path: '',
  quantity: 0,
  headerData: [],
  setTableState: () => {},
  tableState: {
    tablePage: 1,
    showData: undefined
  }
})

const Table = ({
  path,
  headerData,
  quantity = 50,
  itemComponent
}: TableProps) => {
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
  const condition = roles.roles.length !== 0 && courses.courses.length !== 0

  useEffect(() => {
    dispatch(getRoles(roles))
    dispatch(getCourses(courses))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return condition ? (
    <TableContext.Provider
      value={{
        path,
        quantity,
        tableState,
        headerData,
        setTableState
      }}
    >
      <Style className='Table'>
        <Filters />

        <Thead sort={sort} />

        {!tableState.showData && (
          <div className='loader'>
            <DotsLoader color={theme.colors.secondary} />
          </div>
        )}

        <Tbody items={items} itemComponent={itemComponent} />
      </Style>
    </TableContext.Provider>
  ) : (
    <div className='loader'>
      <DotsLoader color={theme.colors.secondary} />
    </div>
  )
}

export default Table
