import React, { memo, useContext, useState } from 'react'
import Style from './styles'

import { TableContext } from '../index'
import { Circle } from '../Tbody/styles'

import api from 'services/api'

import ArrowIcon from 'assets/global/ArrowIcon'
import RefreshIcon from 'assets/global/RefreshIcon'

import { Variants } from 'framer-motion'

interface TheadProps {
  sort?: (_name: any) => void
}

const arrow: Variants = {
  default: {
    rotate: -90
  },
  up: {
    rotate: -180
  },
  down: {
    rotate: -0
  }
}

const Thead = ({ sort }: TheadProps) => {
  const { headerData, setTableState, quantity, path } = useContext(TableContext)

  const initialArrows = headerData.map(({ name }) => ({ [name]: 'default' }))
  const [arrows, setArrows] = useState(initialArrows)

  const onThClick = (id: any, index: number) => {
    const before = arrows[index][id]
    const resetArrows = initialArrows

    before === 'default' || before === 'down'
      ? (resetArrows[index][id] = 'up')
      : (resetArrows[index][id] = 'down')

    setArrows(resetArrows)
    sort && sort(id)
  }

  const onRefreshClick = async () => {
    setTableState({
      tablePage: 1,
      showData: []
    })

    const { requests } = await api.get(`${path}?page=1&per_page=${quantity}`)

    setTableState({
      tablePage: 1,
      showData: requests
    })
  }

  return (
    <Style draggable='false'>
      <thead>
        <tr>
          <th id='refresh'>
            <RefreshIcon onClick={onRefreshClick} />
          </th>

          {headerData.map(({ label, name, indexer, circle }, index) => {
            if (circle)
              return (
                <th id={name} key={name}>
                  <button type='button'>
                    <Circle />
                  </button>
                </th>
              )

            return (
              <th id={name} key={name}>
                <button
                  type='button'
                  onClick={() => onThClick(indexer || name, index)}
                >
                  <ArrowIcon
                    initial={false}
                    variants={arrow}
                    animate={arrows[index][name]}
                  />
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

export default memo(Thead)
