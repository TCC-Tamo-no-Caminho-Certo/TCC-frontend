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

import { StatusTypes } from 'utils/status'

import { Role } from 'store/roles'

import useSortableData from 'hooks/useSortableData'

import DotsLoader from 'components/DotsLoader'

import { ThemeContext } from 'styled-components'

export interface ItemData {
  id: number
  role: Role
  name: string
  date: string
  status: string
  user_id: number
  docId?: string
  feedback?: string
  voucherUrl?: string
  statusCircle: StatusTypes
}

interface TableContextProps {
  setTableState: Dispatch<SetStateAction<TableState>>
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

export const TableContext = createContext<TableContextProps | undefined>(
  undefined
)

const Table = () => {
  const theme = useContext(ThemeContext)
  const [tableState, setTableState] = useState<TableState>({
    showData: undefined,
    tablePage: 1
  })
  const { items, sort } = useSortableData(tableState.showData, {
    direction: 'descending',
    indexer: 'name'
  })

  const quantity = 50

  useEffect(() => console.log('TABLE-STATE', tableState), [tableState])

  return (
    <>
      <Style className='Table'>
        <TableContext.Provider value={{ tableState, setTableState }}>
          <Filters quantity={quantity} />

          <Thead headerData={headerData} sort={sort} />

          <Tbody headerData={headerData} items={items} quantity={quantity} />

          {tableState.showData === null && (
            <DotsLoader color={theme.colors.secondary} />
          )}
        </TableContext.Provider>
      </Style>
    </>
  )
}

export default Table
