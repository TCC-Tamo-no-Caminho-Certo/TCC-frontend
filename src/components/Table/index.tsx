import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import Style from './styles'

import {
  BodyRowType,
  GetDataType,
  HeaderType,
  TableMethods,
  TableProps,
  TableStateType
} from './types'

import RefreshIcon from 'assets/global/RefreshIcon'
import ArrowIcon, { arrowAnimation } from 'assets/global/ArrowIcon'

import DotsLoader from 'components/DotsLoader'

import { ThemeContext } from 'styled-components'

const initialTableSort: TableStateType = {
  direction: 'up',
  items: [
    { rowLabel: { initialTableRow: { label: '', name: '' } }, rowValue: [] }
  ]
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
          id='TableRefreshIcon'
          animate={loading}
          onClick={onRefreshIconClick}
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

export type { GetDataType, BodyRowType, HeaderType, TableMethods }

export default Table
