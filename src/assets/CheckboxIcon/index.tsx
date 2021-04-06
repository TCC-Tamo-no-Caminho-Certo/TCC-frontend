import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useState
} from 'react'

import { motion, Variants } from 'framer-motion'
import { ThemeContext } from 'styled-components'

export interface CheckboxIconMethods {
  changeCheck: (_value: boolean) => void
}

const pathAnimation: Variants = {
  check: {
    pathLength: 1,
    transition: {
      type: 'tween',
      duration: 0.4
    }
  },
  unCheck: {
    d: 'M3 6 l3 4 l7 -6',
    pathLength: 0,
    transition: {
      type: 'tween',
      duration: 0.2
    }
  }
}

const CheckboxIcon = forwardRef((props, ref) => {
  const theme = useContext(ThemeContext)
  const [checked, setChecked] = useState(false)

  const changeCheck = (value: boolean) => {
    setChecked(value)
  }

  useImperativeHandle(ref, () => ({ changeCheck }))

  return (
    <svg
      className='CheckboxIcon'
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='0.5'
        y='0.5'
        width='14'
        height='14'
        stroke='url(#checkboxRadial)'
      />

      <defs>
        <motion.radialGradient
          animate={{
            cx: [0, 1, 1, 0, 0],
            cy: [0, 0, 1, 1, 0]
          }}
          transition={{
            type: 'tween',
            duration: 3,
            repeat: Infinity
          }}
          id='checkboxRadial'
          r='1'
        >
          <stop stopColor={theme.colors.tertiary} />

          <stop offset='1' stopColor={theme.colors.primary} />
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
})

export default CheckboxIcon
