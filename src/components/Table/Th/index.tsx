import React, { HTMLProps } from 'react'
import Style from './styles'

import ArrowIcon, { arrowAnimation } from 'assets/global/ArrowIcon'

import { useCycle } from 'framer-motion'

interface ThProps extends HTMLProps<ThProps> {
  label: string
}

const Th = ({ label, ...props }: ThProps) => {
  const [arrowDirection, cycle] = useCycle('right', 'top', 'bottom')

  return (
    <Style {...(props as any)}>
      <button type='button' onClick={() => cycle()}>
        <ArrowIcon
          className='ArrowIcon'
          initial='initialRight'
          animate={arrowDirection}
          variants={arrowAnimation}
        />

        <span>{label}</span>
      </button>
    </Style>
  )
}

export default Th
