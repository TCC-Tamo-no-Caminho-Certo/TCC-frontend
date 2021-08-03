import React, { useContext, useState } from 'react'
import Style from './styles'

import { TableContext } from '../index'

import transition from 'utils/transition'

import { SortType } from 'hooks/useSortableData'

import ArrowIcon from 'assets/global/ArrowIcon'
import RefreshIcon from 'assets/global/RefreshIcon'

import { Variants } from 'framer-motion'

interface TheadProps<HeaderDataType> {
  sort?: SortType<HeaderDataType>
}

const arrow: Variants = {
  default: { rotate: -90, transition },
  up: { rotate: -180, transition },
  down: { rotate: -0, transition }
}

function Thead<T>({ sort }: TheadProps<T>) {
  const tableContext = useContext(TableContext)

  const initialArrows = tableContext?.headerData.map(({ name }) => ({
    [name]: 'default'
  }))
  const [arrows, setArrows] = useState(initialArrows)

  const onThClick = (id: any, index: number) => {
    if (arrows && initialArrows) {
      const before = arrows[index][id]
      const resetArrows = initialArrows

      before === 'default' || before === 'down'
        ? (resetArrows[index][id] = 'up')
        : (resetArrows[index][id] = 'down')

      setArrows(resetArrows)
      sort && sort(id)
    }
  }

  const onRefreshClick = async () => {
    tableContext?.makeRequest(1)
  }

  return (
    <Style draggable='false'>
      <thead>
        <tr>
          <th id='refresh'>
            <RefreshIcon onClick={onRefreshClick} />
          </th>

          {tableContext?.headerData.map(({ label, name }, index) => {
            return (
              <th id={name} key={name}>
                <button type='button' onClick={() => onThClick(name, index)}>
                  {arrows && (
                    <ArrowIcon variants={arrow} animate={arrows[index][name]} />
                  )}
                  {label}
                </button>
              </th>
            )
          })}
        </tr>
      </thead>
    </Style>
  )
}

export default Thead
