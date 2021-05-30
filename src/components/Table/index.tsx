import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import Style from './styles'

import Filters, { FiltersProps } from './Filters'
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
  name: any
  label: string
  role?: boolean
  indexer?: string
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
  makeRequest: () => void
  onCloseClick: () => void
  userInfo?: any
  selectedInfo?: any
}

interface TableProps {
  path: string
  headerData: HeaderData[]
  condition?: boolean
  quantity?: number
  isLoading?: boolean
  filters?: FiltersProps
  itemContent?: (_props: ItemProps) => JSX.Element
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
  filters,
  headerData,
  itemContent,
  quantity = 50,
  condition = true,
  isLoading = true
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
        <Filters {...filters} />

        <Thead sort={sort} />

        {!itemContent &&
          (isLoading ? (
            <div className='loader'>
              <DotsLoader color={theme.colors.secondary} />
            </div>
          ) : (
            <div className='loader'>Nada encontrado</div>
          ))}

        <Tbody items={items} itemContent={itemContent} />
      </Style>
    </TableContext.Provider>
  ) : (
    <div className='loader'>
      <DotsLoader color={theme.colors.secondary} />
    </div>
  )
}

export default Table
