import { useState } from 'react'

interface Return {
  items?: any[]
  sort: any
  sortConfig?: SortableConfig
}

export interface SortableConfig {
  indexer: string
  direction: 'ascending' | 'descending'
}

const useSortableData = (items: any, config?: SortableConfig) => {
  const [sortConfig, setSortConfig] = useState(config)

  if (items) {
    const sortedItems = () => {
      const sortabledItems = [...items]

      if (sortConfig?.indexer)
        sortabledItems.sort((a, b) => {
          const valueA = a.label[sortConfig.indexer]
          const valueB = b.label[sortConfig.indexer]

          console.log('valuea', valueA)
          console.log('valueb', valueB)

          if (valueA < valueB)
            return sortConfig.direction === 'ascending' ? -1 : 1

          if (valueA > valueB)
            return sortConfig.direction === 'ascending' ? 1 : -1

          return 0
        })

      return sortabledItems
    }

    const sort = ({ indexer, direction }: any) => {
      setSortConfig({ indexer, direction: direction })
    }

    return { items: sortedItems(), sort, sortConfig }
  }

  return { items: undefined, sort: undefined, sortConfig: undefined }
}

export default useSortableData
