import React, { useState, useEffect, useRef, InputHTMLAttributes } from 'react'
import Style from './styles'

import { RootState, useSelector, ThemeState } from 'store'

import { useField } from '@unform/core'
import { motion } from 'framer-motion'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

const Checkbox: React.FC<CheckboxProps> = ({ name, ...rest }) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const checkBoxRef = useRef<HTMLInputElement>(null)
  const { fieldName, registerField } = useField(name)
  const [checked, setChecked] = useState(false)

  const pathAnimation = {
    check: {
      pathLength: 0,
      transition: {
        type: 'tween',
        duration: 0.2,
      },
    },
    unCheck: {
      pathLength: 1,
      transition: {
        type: 'tween',
        duration: 0.4,
      },
    },
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: checkBoxRef.current,
      path: 'checked',
    })
  }, [fieldName, registerField])

  return (
    <Style className='Checkbox' onClick={() => setChecked(!checked)}>
      <svg viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <rect x='0.5' y='0.5' width='14' height='14' stroke='url(#checkboxRadial)' />

        <defs>
          <motion.radialGradient
            animate={{ cx: [0, 1, 1, 0, 0], cy: [0, 0, 1, 1, 0] }}
            transition={{ type: 'tween', duration: 3, repeat: Infinity }}
            id='checkboxRadial'
            r='1'
          >
            <stop stopColor={theme.primary} />
            <stop offset='1' stopColor={theme.quaternary} />
          </motion.radialGradient>
        </defs>

        <motion.path
          d='M3 6 l3 4 l7 -6'
          initial='unCheck'
          variants={pathAnimation}
          animate={!checked ? 'check' : 'unCheck'}
          stroke='url(#checkboxRadial)'
        />
      </svg>

      <input ref={checkBoxRef} name={name} id={name} type='checkbox' checked={checked} readOnly {...rest} />
    </Style>
  )
}

export default Checkbox
