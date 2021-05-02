import { useState } from 'react'

interface Return<T> {
  items?: T[]
  sort?: (_indexerToSort: keyof T) => void
  sortConfig?: SortableConfig<T>
}

interface SortableConfig<T> {
  indexer: keyof T
  direction: 'ascending' | 'descending'
}

const useSortableData = <T, _>(
  items: T[] | undefined,
  config: SortableConfig<T>
): Return<T> => {
  const [sortConfig, setSortConfig] = useState(config)

  if (items) {
    const sortedItems = () => {
      const sortableItems = [...items]

      sortableItems.sort((a, b) => {
        const valueA = a[sortConfig.indexer]
        const valueB = b[sortConfig.indexer]

        if (valueA < valueB)
          return sortConfig.direction === 'ascending' ? -1 : 1

        if (valueA > valueB)
          return sortConfig.direction === 'ascending' ? 1 : -1

        return 0
      })

      return sortableItems
    }

    const sort = (indexerToSort: keyof T) => {
      if (
        sortConfig.indexer === indexerToSort &&
        sortConfig.direction === 'ascending'
      )
        setSortConfig({ indexer: indexerToSort, direction: 'descending' })
      else setSortConfig({ indexer: indexerToSort, direction: 'ascending' })
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
