import { ReactElement } from 'react'

export interface TableMethods {
  onRefreshIconClick: () => void
}

type LabelName = { label: string; name: string }

export type HeaderType = {
  name: string
  label: string
  tdWrapper?: (_data: LabelName) => ReactElement | ReactElement[]
  thWrapper?: (_data: LabelName) => ReactElement | ReactElement[]
}

export type BodyRowType = {
  rowValue: any
  rowLabel: { [key: string]: { label: string; name: string } }
}

export interface TableStateType {
  items: BodyRowType[]
  direction: 'up' | 'down'
}

export interface TableProps {
  getData: GetDataType
  headerRow: HeaderType[]
  filters?: boolean
  onRefreshClick?: () => void
  onDataClick?: (_data: BodyRowType) => void
}

export type GetDataType = () => Promise<BodyRowType[]>
