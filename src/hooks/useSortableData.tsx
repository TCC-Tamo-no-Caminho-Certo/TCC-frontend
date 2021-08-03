import { useState } from 'react'

export type SortType<T> = (_prop: SortableConfig<T>) => void

interface Return<T> {
  items?: T[]
  sort?: SortType<T>
  sortConfig?: SortableConfig<T>
}

interface SortableConfig<T> {
  indexer: keyof T
  direction: 'ascending' | 'descending'
}

const useSortableData = <T, _>(
  items: T[] | undefined,
  config?: SortableConfig<T>
): Return<T> => {
  const [sortConfig, setSortConfig] = useState(config)

  if (items) {
    const sortedItems = () => {
      const sortabledItems = [...items]
      if (sortConfig?.indexer)
        sortabledItems.sort((a, b) => {
          const valueA = a[sortConfig.indexer]
          const valueB = b[sortConfig.indexer]

          if (valueA < valueB)
            return sortConfig.direction === 'ascending' ? -1 : 1

          if (valueA > valueB)
            return sortConfig.direction === 'ascending' ? 1 : -1

          return 0
        })

      return sortabledItems
    }

    const sort = ({ indexer, direction }: SortableConfig<T>) => {
      setSortConfig({
        indexer,
        direction: direction || 'ascending'
      })
    }

    return { items: sortedItems(), sort, sortConfig }
  }

  return {
    items: undefined,
    sort: undefined,
    sortConfig: undefined
  }
}

export default useSortableData
