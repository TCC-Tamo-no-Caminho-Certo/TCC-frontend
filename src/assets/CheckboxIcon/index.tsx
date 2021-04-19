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

interface CheckboxInconProps {
  primary?: string
  secondary?: string
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

const CheckboxIcon = forwardRef<CheckboxIconMethods, CheckboxInconProps>(
  ({ primary, secondary }, ref) => {
    const theme = useContext(ThemeContext)
    const [checked, setChecked] = useState(false)

    const changeCheck = (value: boolean) => {
      setChecked(value)
    }

    useImperativeHandle(ref, () => ({ changeCheck }))

    return (
      <svg
        fill='none'
        viewBox='0 0 15 15'
        className='CheckboxIcon'
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
            r='1'
            id='checkboxRadial'
            animate={{
              cx: [0, 1, 1, 0, 0],
              cy: [0, 0, 1, 1, 0]
            }}
            transition={{
              type: 'tween',
              duration: 3,
              repeat: Infinity
            }}
          >
            <stop stopColor={secondary || theme.colors.tertiary} />

            <stop offset='1' stopColor={primary || theme.colors.primary} />
          </motion.radialGradient>
        </defs>

        <motion.path
          d=''
          stroke='url(#checkboxRadial)'
          initial={false}
          variants={pathAnimation}
          animate={checked ? 'check' : 'unCheck'}
        />
      </svg>
    )
  }
)

export default CheckboxIcon
