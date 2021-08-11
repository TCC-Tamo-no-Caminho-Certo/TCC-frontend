import { ReactNode } from 'react'

export interface TableForwardeds {
  onRefreshIconClick: () => void
}

type LabelName = { label: string; name: string }

export type HeaderType = {
  name: string
  label: string
  tdWrapper?: (_data: LabelName) => ReactNode
  thWrapper?: (_data: LabelName) => ReactNode
}

export type BodyRowType = {
  rowValue?: any
  rowLabel: { [key: string]: { label: string; name: string } }
}

export interface TableStateType {
  items: BodyRowType[]
  direction: 'up' | 'down'
}

export interface TableProps {
  getData: GetDataType
  headerRow: HeaderType[]
  children: ReactNode
  onRefreshClick?: () => void
  onDataClick?: (_data: BodyRowType) => void
}

export interface GetDataParams {
  page: number
  filters?: any
}

export interface MakeRequestParams extends GetDataParams {
  prev?: boolean
}

export type GetDataType = (_data: GetDataParams) => Promise<BodyRowType[]>
