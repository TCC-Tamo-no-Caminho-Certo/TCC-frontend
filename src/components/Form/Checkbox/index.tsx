import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import Style from './styles'

import { FormContext, FormState } from '../'

import ErrorTooltip from 'components/Tooltips/ErrorTooltip'

import { motion, Variants } from 'framer-motion'
import { ThemeContext } from 'styled-components'

export interface CheckboxForwardeds {
  check: (_check: boolean) => void
}

interface CheckboxProps {
  id?: string
  name: string
  label?: string
  disabled?: boolean
  onClick?: () => void
  defaultCheck?: boolean
}

const pathAnimation: Variants = {
  check: { pathLength: 1, transition: { type: 'tween', duration: 0.4 } },
  unCheck: {
    pathLength: 0,
    d: 'M3 6 l3 4 l7 -6',
    transition: { type: 'tween', duration: 0.2 }
  }
}

const Checkbox = forwardRef<CheckboxForwardeds, CheckboxProps>(
  (
    { id, name, label, onClick, defaultCheck, disabled = false, ...rest },
    ref
  ) => {
    const form = useContext<FormState | null>(FormContext)
    const theme = useContext(ThemeContext)

    const checkboxRef = useRef<HTMLInputElement>(null)

    const [checked, setChecked] = useState(false)
    const [error, setError] = useState<string>()

    const forwardCheck = (check: boolean) => {
      setChecked(check)
    }

    useEffect(() => {
      setChecked(defaultCheck || false)
    }, [defaultCheck])

    useEffect(() => {
      const checkbox = { inputRef: checkboxRef, setError, type: 'checkbox' }
      form?.registerInput(checkbox)

      return () => form?.removeInput(checkbox)
    }, [form])

    useImperativeHandle(ref, () => ({ check: forwardCheck }))

    return (
      <Style
        id={id}
        error={!!error}
        checked={checked}
        onClick={onClick}
        className='Checkbox'
      >
        <ErrorTooltip error={!!error} content={error} />

        <button
          id='checkbox'
          type='button'
          onClick={() => {
            if (!disabled) {
              setChecked(!checked)
              setError('')
            }
          }}
        >
          <input
            readOnly
            name={name}
            type='checkbox'
            ref={checkboxRef}
            checked={checked}
            {...rest}
          />

          <svg
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
                r='1'
                id='checkboxRadial'
                animate={{ cx: [0, 1, 1, 0, 0], cy: [0, 0, 1, 1, 0] }}
                transition={{ type: 'tween', duration: 3, repeat: Infinity }}
              >
                <stop stopColor={theme.colors.tertiary} />

                <stop offset='1' stopColor={theme.colors.primary} />
              </motion.radialGradient>
            </defs>

            <motion.path
              d=''
              initial={false}
              variants={pathAnimation}
              stroke='url(#checkboxRadial)'
              animate={checked ? 'check' : 'unCheck'}
            />
          </svg>
        </button>

        <button
          type='button'
          className='CheckboxLabel'
          onClick={() => {
            setChecked(!checked)
            setError('')
          }}
        >
          {label}
        </button>
      </Style>
    )
  }
)

export default Checkbox
