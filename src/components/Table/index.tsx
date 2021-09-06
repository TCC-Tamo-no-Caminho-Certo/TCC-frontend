import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import Style, { FilterButton } from './styles'

import {
  BodyRowType,
  GetDataType,
  HeaderType,
  MakeRequestParams,
  TableForwardeds,
  TableProps,
  TableStateType
} from './types'

import useCombinedRefs from 'hooks/useCombinedRefs'

import LoupeIcon from 'assets/Inputs/LoupeIcon'
import RefreshIcon from 'assets/global/RefreshIcon'
import ArrowIcon, { arrowAnimation } from 'assets/global/ArrowIcon'

import Form, { Submit } from 'components/Form'
import DotsLoader from 'components/DotsLoader'

import { ThemeContext } from 'styled-components'

const initialTableSort: TableStateType = {
  direction: 'up',
  items: [
    { rowLabel: { initialTableRow: { label: '', name: '' } }, rowValue: [] }
  ]
}

const Table = forwardRef<TableForwardeds, TableProps>(
  ({ getData, headerRow, onRefreshClick, onDataClick, children }, ref) => {
    const theme = useContext(ThemeContext)
    const tableRef = useRef<HTMLDivElement>(null)

    const auxRef = useCombinedRefs([ref, tableRef])

    const [tableSort, setTableSort] = useState<TableStateType>(initialTableSort)
    const initialArrows = headerRow.map(() => 'right')
    const [arrows, setArrows] = useState(initialArrows)
    const [loading, setLoading] = useState(true)
    const [clearFilters, setClearFilters] = useState(false)

    let page = 1

    const onRefreshIconClick = () => {
      setLoading(true)
      makeRequest({ page: 1 })
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

    const onTableScroll = () => {
      const table = auxRef.current

      if (table) {
        const position = Math.ceil(table.scrollHeight - table.scrollTop)

        if (position <= table.clientHeight && !clearFilters) {
          page += 1
          makeRequest({ page, prev: true })
        }
      }
    }

    const makeRequest = useCallback(
      async ({ filters, page, prev }: MakeRequestParams) => {
        setLoading(true)
        const items = await getData({ filters, page })
        setLoading(false)

        prev
          ? setTableSort(prev => ({
              direction: prev.direction,
              items: [...prev.items, ...items]
            }))
          : setTableSort(({ direction }) => ({ direction, items }))

        // eslint-disable-next-line react-hooks/exhaustive-deps
      },
      [getData]
    )

    useEffect(() => {
      makeRequest({ page: 1 })
    }, [makeRequest])

    useImperativeHandle(ref, () => ({ onRefreshIconClick }))

    return (
      <>
        <Form
          className='TableFilters'
          getData={data => {
            makeRequest({ filters: data, page: 1 })
          }}
        >
          {!clearFilters && children}

          <FilterButton className='FilterButton'>
            <Submit>
              <LoupeIcon />
              Buscar
            </Submit>

            <button
              type='button'
              onClick={() => {
                setClearFilters(true)
                makeRequest({ page: 1 })
                setTimeout(() => setClearFilters(false), 300)
              }}
            >
              Limpar filtros
            </button>
          </FilterButton>
        </Form>

        <Style className='Table' ref={auxRef as any} onScroll={onTableScroll}>
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
                      className={name}
                    >
                      {thWrapper({ label, name })}
                    </th>
                  ) : (
                    <th
                      onClick={() => onThClick(name, index)}
                      key={name}
                      className={name}
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

            <tbody>
              {tableSort.items?.map(({ rowLabel, rowValue }, trIndex) => (
                <tr
                  data-cy='TableTr'
                  key={trIndex}
                  onClick={() => onTrClick({ rowLabel, rowValue })}
                >
                  {headerRow.map(({ name, tdWrapper }, tdIndex) => {
                    if (rowLabel[name])
                      return tdWrapper ? (
                        <td
                          key={tdIndex}
                          className={name}
                          id={rowLabel[name].name}
                          data-cy={rowLabel[name].name}
                        >
                          {tdWrapper({
                            label: rowLabel[name].label,
                            name: rowLabel[name].name
                          })}
                        </td>
                      ) : (
                        <td
                          key={tdIndex}
                          className={name}
                          id={rowLabel[name].name}
                          data-cy={rowLabel[name].name}
                        >
                          {rowLabel[name].label}
                        </td>
                      )

                    return <td key={tdIndex}></td>
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {loading && (
            <div id='loader'>
              <DotsLoader color={theme.colors.secondary} />
            </div>
          )}
        </Style>
      </>
    )
  }
)

export type { GetDataType, BodyRowType, HeaderType, TableForwardeds }

export default Table
