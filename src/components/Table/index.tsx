import React, {
  forwardRef,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import Style from './styles'

import RefreshIcon from 'assets/global/RefreshIcon'
import ArrowIcon, { arrowAnimation } from 'assets/global/ArrowIcon'

import DotsLoader from 'components/DotsLoader'

import { ThemeContext } from 'styled-components'

export interface TableMethods {
  onRefreshIconClick: () => void
}

type LabelName = { label: string; name: string }

export type HeaderType = {
  label: string
  name: string
  tdWrapper?: (_data: LabelName) => ReactElement | ReactElement[]
  thWrapper?: (_data: LabelName) => ReactElement | ReactElement[]
}

export type BodyRowType = {
  rowValue: any
  rowLabel: {
    [key: string]: { label: string; name: string }
  }
}

interface TableStateType {
  direction: 'up' | 'down'
  items: BodyRowType[]
}

interface TableProps {
  getData: GetDataType
  headerRow: HeaderType[]
  onDataClick?: (_data: BodyRowType) => void
  onRefreshClick?: () => void
}

export type GetDataType = () => Promise<BodyRowType[]>

const initialTableSort: TableStateType = {
  items: [
    {
      rowLabel: {
        initialTableRow: { label: '', name: '' }
      },
      rowValue: []
    }
  ],
  direction: 'up'
}

const Table = forwardRef<TableMethods, TableProps>(
  ({ getData, headerRow, onRefreshClick, onDataClick }, ref) => {
    const theme = useContext(ThemeContext)

    const [tableSort, setTableSort] = useState<TableStateType>(initialTableSort)
    const initialArrows = headerRow.map(() => 'right')

    const [arrows, setArrows] = useState(initialArrows)
    const [loading, setLoading] = useState(true)

    const onRefreshIconClick = () => {
      setLoading(true)
      makeRequest()
      onRefreshClick && onRefreshClick()
    }

    const onTrClick = (data: BodyRowType) => {
      onDataClick && onDataClick(data)
    }

    const onThClick = (indexer: string, index: number) => {
      const resetArrows = initialArrows
      const before = arrows[index]

      before === 'right' || before === 'bottom'
        ? (resetArrows[index] = 'top')
        : (resetArrows[index] = 'bottom')

      setArrows(resetArrows)

      setTableSort(({ items, direction }) => {
        const sortabledItems = [...items]
        sortabledItems.sort((a, b) => {
          const valueA = a.rowLabel[indexer].name
          const valueB = b.rowLabel[indexer].name

          if (valueA < valueB) return direction === 'up' ? -1 : 1
          if (valueA > valueB) return direction === 'up' ? 1 : -1
          return 0
        })

        return {
          items: sortabledItems,
          direction: direction === 'up' ? 'down' : 'up'
        }
      })
    }

    const makeRequest = useCallback(async () => {
      setLoading(true)
      const items = await getData()
      setLoading(false)

      setTableSort(({ direction }) => ({ direction, items }))
    }, [getData])

    useEffect(() => {
      makeRequest()
    }, [makeRequest])

    useImperativeHandle(ref, () => ({ onRefreshIconClick }))

    return (
      <Style className='Table' ref={ref as any}>
        <RefreshIcon
          animate={loading}
          onClick={onRefreshIconClick}
          id='TableRefreshIcon'
        />

        <table>
          <thead>
            <tr>
              {headerRow.map(({ label, name, thWrapper }, index) =>
                thWrapper ? (
                  <th
                    onClick={() => onThClick(name, index)}
                    key={name}
                    id={name}
                  >
                    {thWrapper({ label, name })}
                  </th>
                ) : (
                  <th
                    onClick={() => onThClick(name, index)}
                    key={name}
                    id={name}
                  >
                    {!loading && (
                      <ArrowIcon
                        className='ArrowIcon'
                        initial='initialRight'
                        animate={arrows[index]}
                        variants={arrowAnimation}
                      />
                    )}

                    {label}
                  </th>
                )
              )}
            </tr>
          </thead>

          {!loading && (
            <tbody>
              {tableSort.items?.map(({ rowLabel, rowValue }, trIndex) => (
                <tr
                  key={trIndex}
                  onClick={() => onTrClick({ rowLabel, rowValue })}
                >
                  {headerRow.map(({ name, tdWrapper }, tdIndex) => {
                    if (rowLabel[name])
                      return tdWrapper ? (
                        <td id={rowLabel[name].name} key={tdIndex}>
                          {tdWrapper({
                            label: rowLabel[name].label,
                            name: rowLabel[name].name
                          })}
                        </td>
                      ) : (
                        <td id={rowLabel[name].name} key={tdIndex}>
                          {rowLabel[name].label}
                        </td>
                      )

                    return <td key={tdIndex}></td>
                  })}
                </tr>
              ))}
            </tbody>
          )}
        </table>

        {loading && (
          <div id='loader'>
            <DotsLoader color={theme.colors.secondary} />
          </div>
        )}
      </Style>
    )
  }
)

export default Table
