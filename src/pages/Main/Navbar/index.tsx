import React, { useState, useEffect } from 'react'
import Style, { Profile, AnimationShape } from './styles'

import avatar from 'assets/avatar.jpg'

import anime from 'animejs'

const Navbar: React.FC = () => {
  const radius = 20
  const width = 320
  const margin_top = 30
  const margin_right = 35

  const totalHeight = document.getElementById('svg')?.clientHeight as number
  const totalWidth = document.getElementById('svg')?.clientWidth as number

  const [menuOpen, setMenuOpen] = useState(false)

  const menuOpenToggle = () => {
    anime({
      targets: 'path',
      easing: 'linear',
      duration: 500,
      d: menuOpen
        ? `
        M ${-totalHeight},${totalHeight / 2}
        a ${totalWidth},${totalWidth} 0 1,1 ${totalWidth * 2},0
        a ${totalWidth},${totalWidth} 0 1,1 ${totalWidth * -2},0
      `
        : `
        M ${width - radius * 2 - margin_right},${radius + margin_top}
        a ${radius},${radius} 0 1,1 ${radius * 2},0
        a ${radius},${radius} 0 1,1 ${radius * -2},0
      `,
    })

    setMenuOpen(!menuOpen)
  }

  useEffect(() => {
    setMenuOpen(true)
  }, [])

  return (
    <Style>
      Teste
      <Profile>
        <AnimationShape id='svg'>
          <svg>
            <path
              fill='#80535D'
              d={`
                M ${width - radius * 2 - margin_right},${radius + margin_top}
                a ${radius},${radius} 0 1,1 ${radius * 2},0
                a ${radius},${radius} 0 1,1 ${radius * -2},0
              `}
            />
          </svg>
        </AnimationShape>

        <button type='button' onClick={menuOpenToggle}>
          <img src={avatar} alt='profile' draggable='false' />
        </button>
      </Profile>
    </Style>
  )
}

export default Navbar
