import React, { useState, useEffect, useContext } from 'react'
import Style, { NavbarBackground } from './styles'

import home from 'assets/ProfileNavbar/home.svg'
import security from 'assets/ProfileNavbar/security.svg'
import historic from 'assets/ProfileNavbar/historic.svg'
import financial from 'assets/ProfileNavbar/financial.svg'
import editProfile from 'assets/ProfileNavbar/editProfile.svg'
import customization from 'assets/ProfileNavbar/customization.svg'

import anime from 'animejs'
import { Link } from 'react-router-dom'
import { ThemeContext } from 'styled-components'

interface NavbarProps {
  selected: string
}

const Navbar: React.FC<NavbarProps> = ({ selected }) => {
  const [minimizeMenu, setMinimizeMenu] = useState<boolean | string>('starting')
  const themes = useContext(ThemeContext)

  function onMenuButtonClick() {
    minimizeMenu === 'starting' ? setMinimizeMenu(true) : setMinimizeMenu(!minimizeMenu)
  }

  useEffect(() => {
    if (minimizeMenu !== 'starting') {
      if (minimizeMenu) {
        anime({
          targets: '#navbarList li a span',
          easing: 'easeInOutSine',
          duration: 500,
          opacity: [0, 1],
          translateX: [-20, 0],
          delay: anime.stagger(50),
        })

        anime({
          targets: ['#navbarBackground', '#navbarList li'],
          easing: 'linear',
          duration: 200,
          width: [72, 210],
        })

        anime({
          targets: '#first',
          easing: 'linear',
          duration: 200,
          translateY: 13.5,
          rotate: '-45deg',
        })

        anime({
          targets: '#second',
          easing: 'linear',
          duration: 200,
          opacity: [1, 0],
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
          targets: ['#navbarBackground', '#navbarList li'],
          easing: 'linear',
          duration: 200,
          width: [210, 72],
        })

        anime({
          targets: '#first',
          easing: 'linear',
          duration: 200,
          translateY: 0,
          rotate: 0,
        })

        anime({
          targets: '#second',
          easing: 'linear',
          duration: 200,
          opacity: [0, 1],
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
  }, [minimizeMenu])

  return (
    <Style selected={selected} minimizeMenu={minimizeMenu}>
      <NavbarBackground id='navbarBackground' />

      <ul id='navbarList'>
        <li id='menuButton'>
          <button type='button' onClick={onMenuButtonClick}>
            <svg
              width='24'
              height='17'
              viewBox='0 0 24 17'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect id='first' width='24' height='3' fill={themes.white} />
              <rect id='second' y='7' width='24' height='3' fill={themes.white} />
              <rect id='third' y='14' width='24' height='3' fill={themes.white} />
            </svg>
          </button>
        </li>

        <li id='home'>
          <Link to='profile'>
            <img src={home} alt='Home' />
            {minimizeMenu === true && <span>Home</span>}
          </Link>
        </li>

        <li id='editProfile'>
          <Link to='editProfile'>
            <img src={editProfile} alt='Editar Perfil' />
            {minimizeMenu === true && <span>Editar Perfil</span>}
          </Link>
        </li>

        <li id='security'>
          <Link to='security'>
            <img src={security} alt='Segurança' />
            {minimizeMenu === true && <span>Segurança</span>}
          </Link>
        </li>

        <li id='customization'>
          <Link to='customization'>
            <img src={customization} alt='Personalização' />
            {minimizeMenu === true && <span>Personalização</span>}
          </Link>
        </li>

        <li id='financial'>
          <Link to='financial'>
            <img src={financial} alt='Personalização' />
            {minimizeMenu === true && <span>Financeiro</span>}
          </Link>
        </li>

        <li id='historic'>
          <Link to='historic'>
            <img src={historic} alt='Histórico' />
            {minimizeMenu === true && <span>Histórico</span>}
          </Link>
        </li>
      </ul>
    </Style>
  )
}

export default Navbar
