import React, {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import Style from './styles'

import Filters, { FiltersProps } from './Filters'
import Tbody from './Tbody'
import Thead from './Thead'

import useSortableData from 'hooks/useSortableData'

import DotsLoader from 'components/DotsLoader'

import { ThemeContext } from 'styled-components'

interface Data<DataType, Selected> {
  data: DataType
  selectedData: Selected
}

export type GetData<DataType, Selected> = (
  _page: number,
  _filters?: string
) => Promise<Data<DataType, Selected>[]>

export interface HeaderData {
  name: string
  label: string
  component?: (_data: any) => ReactElement | ReactElement[]
}

interface TableState {
  page: number
  tableData?: any[]
}

export interface ItemProps<DataType, Selected> {
  resetTable: () => void
  onCloseClick: () => void
  data?: Data<DataType, Selected>
}

interface TableContextProps {
  tableState: TableState
  headerData: HeaderData[]
  setTableState: Dispatch<SetStateAction<TableState>>
  makeRequest: (_page: number, _filters?: string) => void
}

interface TableProps<DataType, Selected> {
  headerData: HeaderData[]
  getData: GetData<DataType, Selected>
  filters?: FiltersProps
  itemContent?: (_props: ItemProps<DataType, Selected>) => JSX.Element
}

export const TableContext = createContext<TableContextProps | undefined>(
  undefined
)

function Table<DataType, Selected>({
  getData,
  filters,
  headerData,
  itemContent
}: TableProps<DataType, Selected>) {
  const theme = useContext(ThemeContext)

  const [tableState, setTableState] = useState<TableState>({ page: 1 })

  const { tableData } = tableState
  const { items, sort } = useSortableData(tableData, {
    indexer: 'name',
    direction: 'ascending'
  })

  const makeRequest = useCallback(
    async (page: number, filters?: string) => {
      if (getData) {
        const gotData = await getData(page, filters)
        const tableData = gotData.map(({ data }) => data)
        setTableState({ tableData, page })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getData]
  )

  useEffect(() => {
    makeRequest(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TableContext.Provider
      value={{ makeRequest, tableState, headerData, setTableState }}
    >
      <Style className='Table'>
        <Filters {...filters} />

        <Thead<DataType> sort={sort} />

        {!tableData && <DotsLoader color={theme.colors.secondary} />}

        <Tbody items={items} itemContent={itemContent} />
      </Style>
    </TableContext.Provider>
  )
}

export default Table
