import React, { useState, useEffect, useRef, InputHTMLAttributes } from 'react'
import Style from './styles'

import { RootState, useSelector, ThemeState } from 'store'

import anime from 'animejs'
import { useField } from '@unform/core'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

const Checkbox: React.FC<CheckboxProps> = ({ name, ...rest }) => {
  const stringName = `${name}Radial`
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const [checked, setChecked] = useState(false)

  const checkBoxRef = useRef<HTMLInputElement>(null)
  const { fieldName, registerField } = useField(name)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: checkBoxRef.current,
      path: 'checked',
    })
  }, [fieldName, registerField])

  function onCheckBoxClick() {
    const checkedAnimation = anime.timeline({
      targets: `#${name}Path`,
      duration: 300,
      easing: 'easeInOutSine',
    })

    checked
      ? checkedAnimation.add({ d: 'M3 6' })
      : checkedAnimation.add({ d: ['M3 6', 'M3 6 l3 4', 'M3 6 l3 4 l7 -6'] })

    setChecked(!checked)
  }

  useEffect(() => {
    anime
      .timeline({
        targets: `#${stringName}`,
        loop: true,
        duration: 1000,
      })
      .add({ cx: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] })
      .add({ cy: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] })
      .add({ cx: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0] })
      .add({ cy: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0] })
  }, [stringName])

  return (
    <Style className='Checkbox' id={`${name}Checkbox`} onClick={onCheckBoxClick}>
      <svg viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <rect x='0.5' y='0.5' width='14' height='14' stroke={`url(#${stringName})`} />

        <defs>
          <radialGradient id={stringName} cx='0' cy='0' r='1'>
            <stop stopColor={theme.primary} />
            <stop offset='1' stopColor={theme.quaternary} />
          </radialGradient>
        </defs>

        <path id={`${name}Path`} d='M3 6' stroke={`url(#${stringName})`} />
      </svg>

      <input name={name} id={name} ref={checkBoxRef} type='checkbox' checked={checked} {...rest} />
    </Style>
  )
}

export default Checkbox
