import React from 'react'
import Style, { Choose } from './styles'

import { show } from '../index'

interface WaysProps {
  animations: any
  setAnimations: any
  registerEmailRef: any
}

const Ways = ({ animations, setAnimations, registerEmailRef }: WaysProps) => {
  return (
    <Style>
      <Choose
        exit='exit'
        animate='enter'
        variants={show}
        condition={animations.ways}
      >
        <span id='title'>Forma de registro</span>

        <div>
          <button
            id='cy-email'
            type='button'
            onClick={() => {
              setAnimations((prev: any) => ({
                ...prev,
                submit: false,
                voucher: false
              }))

              registerEmailRef.current?.toggleRegister()
            }}
          >
            E-mail institucional
          </button>

          <button
            type='button'
            id='cy-voucher'
            onClick={() =>
              setAnimations((prev: any) => ({ ...prev, voucher: true }))
            }
          >
            Enviar comprovante
          </button>
        </div>
      </Choose>
    </Style>
  )
}

export default Ways
