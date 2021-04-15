import React, { memo, useContext, useState } from 'react'
import Style from './styles'

import { HeaderData, ItemData, RequestsContext } from '../index'
import { Circle } from '../Tbody/styles'
import { transformArray } from '../Tbody'

import api from 'services/api'

import ArrowIcon from 'assets/global/ArrowIcon'
import RefreshIcon from 'assets/global/RefreshIcon'

import { Variants } from 'framer-motion'

interface TheadProps {
  sort?: (_name: keyof ItemData) => void
  headerData: HeaderData[]
}

type Arrow = {
  [_name in keyof ItemData]: 'default' | 'up' | 'down'
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

const Thead = ({ headerData, sort }: TheadProps) => {
  const requestsContext = useContext(RequestsContext)

  const initialArrows: Arrow[] = headerData.map(({ name }) => {
    return { [name]: 'default' } as Arrow
  })
  const [arrows, setArrows] = useState(initialArrows)
  const onThClick = (id: keyof ItemData, index: number) => {
    const before = arrows[index][id]
    const resetArrows = initialArrows

    before === 'default' || before === 'down'
      ? (resetArrows[index][id] = 'up')
      : (resetArrows[index][id] = 'down')

    setArrows(resetArrows)
    sort && sort(id)
  }

  const onRefreshClick = async () => {
    requestsContext?.setTableState({
      tablePage: 1,
      showData: []
    })

    const { requests } = await api.get(
      `user/role/requests?page=1&per_page=${requestsContext.quantity}`
    )

    requestsContext?.setTableState({
      tablePage: 1,
      showData: transformArray(requests, requestsContext.roles)
    })
  }

  return (
    <Style draggable='false'>
      <thead>
        <tr>
          <RefreshIcon onClick={onRefreshClick} />

          {headerData.map(({ label, name }, index) => {
            if (name === 'statusCircle')
              return (
                <th className='statusCircle' key={name}>
                  <button type='button'>
                    <Circle />
                  </button>
                </th>
              )

            return (
              <th key={name} className={name}>
                <button type='button' onClick={() => onThClick(name, index)}>
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
