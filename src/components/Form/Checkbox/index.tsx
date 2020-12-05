import React, { FC, memo } from 'react'

import { motion } from 'framer-motion'

interface Props {
  theme?: any
  checked: boolean
}

const Checkbox: FC<Props> = ({ checked, theme }) => {
  const pathAnimation = {
    check: {
      pathLength: 1,
      transition: {
        type: 'tween',
        duration: 0.4,
      },
    },
    unCheck: {
      d: 'M3 6 l3 4 l7 -6',
      pathLength: 0,
      transition: {
        type: 'tween',
        duration: 0.2,
      },
    },
  }

  return (
    <svg viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='0.5' y='0.5' width='14' height='14' stroke='url(#checkboxRadial)' />

      <defs>
        <motion.radialGradient
          animate={{ cx: [0, 1, 1, 0, 0], cy: [0, 0, 1, 1, 0] }}
          transition={{ type: 'tween', duration: 3, repeat: Infinity }}
          id='checkboxRadial'
          r='1'
        >
          <stop stopColor='#6e4850' />

          <stop offset='1' stopColor='#D65881' />
        </motion.radialGradient>
      </defs>

      <motion.path
        d=''
        initial={false}
        variants={pathAnimation}
        animate={checked ? 'check' : 'unCheck'}
        stroke='url(#checkboxRadial)'
      />
    </svg>
  )
}

export default memo(Checkbox)
