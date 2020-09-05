import React, { useContext, useEffect } from 'react'
import Style from './styles'

import anime from 'animejs'
import { ThemeContext } from 'styled-components'
import Anime from '@mollycule/react-anime'

interface HamburgerProps {
  state?: boolean
  onClick(): void
}

const Hamburger: React.FC<HamburgerProps> = ({ state, onClick, ...rest }) => {
  const themes = useContext(ThemeContext)

  function onHamburgerClick() {
    onClick()

    if (!state) {
      anime({
        targets: '#first',
        easing: 'linear',
        duration: 200,
        translateY: 13.5,
        rotate: '-45deg',
      })

      anime({
        targets: '#third',
        easing: 'linear',
        duration: 200,
        translateY: -13.5,
        translateX: '50%',
        rotate: '45deg',
      })
    } else {
      anime({
        targets: '#first',
        easing: 'linear',
        duration: 200,
        translateY: 0,
        rotate: 0,
      })

      anime({
        targets: '#third',
        easing: 'linear',
        duration: 200,
        translateY: 0,
        translateX: 0,
        rotate: 0,
      })
    }
  }

  useEffect(() => {
    if (state) {
      anime({
        targets: '#first',
        easing: 'linear',
        duration: 0,
        translateY: 13.5,
        rotate: '-45deg',
      })

      anime({
        targets: '#third',
        easing: 'linear',
        duration: 0,
        translateY: -13.5,
        translateX: '50%',
        rotate: '45deg',
      })
    } else {
      anime({
        targets: '#first',
        easing: 'linear',
        duration: 0,
        translateY: 0,
        rotate: 0,
      })

      anime({
        targets: '#third',
        easing: 'linear',
        duration: 0,
        translateY: 0,
        translateX: 0,
        rotate: 0,
      })
    }
  }, [state])

  return (
    <Style onClick={onHamburgerClick} {...rest}>
      <svg
        width='24'
        height='17'
        viewBox='0 0 24 17'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect id='first' width='24' height='3' fill={themes.white} />

        <rect id='second' y='7' width='24' height='3' fill={themes.white} opacity={state ? 0 : 1} />

        <rect id='third' y='14' width='24' height='3' fill={themes.white} />
      </svg>
    </Style>
  )
}

export default Hamburger
