import React, { memo, useState } from 'react'
import Style from './styles'

import { HeaderData, TableData } from '../index'
import Circle from '../Circle'

import ArrowIcon from 'assets/ArrowIcon'

import { Variants } from 'framer-motion'

interface TheadProps {
  sort?: (_name: keyof TableData) => void
  headerData: HeaderData[]
}

type Arrow = {
  [_name in keyof TableData]: 'default' | 'up' | 'down'
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
  const initialArrows: Arrow[] = headerData.map(({ name }) => {
    return { [name]: 'default' } as Arrow
  })

  const [arrows, setArrows] = useState(initialArrows)

  const onButtonClick = (id: keyof TableData, index: number) => {
    const before = arrows[index][id]
    const resetArrows = initialArrows

    if (before === 'default' || before === 'down') resetArrows[index][id] = 'up'
    else resetArrows[index][id] = 'down'

    setArrows(resetArrows)
    sort && sort(id)
  }

  return (
    <Style draggable='false'>
      <thead>
        <tr>
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
              <th key={name}>
                <button
                  type='button'
                  onClick={() => onButtonClick(name, index)}
                >
                  <ArrowIcon
                    variants={arrow}
                    initial={false}
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
