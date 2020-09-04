import React, { useState, useEffect, useContext } from 'react'
import Style, { Navbar, NavbarBackground } from './styles'

import home from 'assets/ProfileNavbar/home.svg'
import editProfile from 'assets/ProfileNavbar/editProfile.svg'
import security from 'assets/ProfileNavbar/security.svg'
import customization from 'assets/ProfileNavbar/customization.svg'
import financial from 'assets/ProfileNavbar/financial.svg'
import historic from 'assets/ProfileNavbar/historic.svg'

import anime from 'animejs'
import { ThemeContext } from 'styled-components'

const Profile: React.FC = () => {
  const [minimizeMenu, setMinimizeMenu] = useState<boolean | string>('starting')
  const [selected, setSelected] = useState('home')
  const themes = useContext(ThemeContext)

  function onMenuButtonClick() {
    minimizeMenu === 'starting' ? setMinimizeMenu(true) : setMinimizeMenu(!minimizeMenu)
  }

  useEffect(() => {
    if (minimizeMenu !== 'starting') {
      if (minimizeMenu) {
        anime({
          targets: '#navbarList li button span',
          easing: 'easeInOutSine',
          duration: 500,
          opacity: [0, 1],
          translateX: [-20, 0],
          delay: anime.stagger(50),
        })

        anime({
          targets: ['#navbarBackground', '#navbarList li', `#${selected}`],
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
    <Style>
      <Navbar selected={selected} minimizeMenu={minimizeMenu}>
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
            <button type='button' onClick={() => setSelected('home')}>
              <img src={home} alt='Home' />
              {minimizeMenu === true && <span>Home</span>}
            </button>
          </li>

          <li id='editProfile'>
            <button type='button' onClick={() => setSelected('editProfile')}>
              <img src={editProfile} alt='Editar Perfil' />
              {minimizeMenu === true && <span>Editar Perfil</span>}
            </button>
          </li>

          <li id='security'>
            <button type='button' onClick={() => setSelected('security')}>
              <img src={security} alt='Segurança' />
              {minimizeMenu === true && <span>Segurança</span>}
            </button>
          </li>

          <li id='customization'>
            <button type='button' onClick={() => setSelected('customization')}>
              <img src={customization} alt='Personalização' />
              {minimizeMenu === true && <span>Personalização</span>}
            </button>
          </li>

          <li id='financial'>
            <button type='button' onClick={() => setSelected('financial')}>
              <img src={financial} alt='Personalização' />
              {minimizeMenu === true && <span>Financeiro</span>}
            </button>
          </li>

          <li id='historic'>
            <button type='button' onClick={() => setSelected('historic')}>
              <img src={historic} alt='Histórico' />
              {minimizeMenu === true && <span>Histórico</span>}
            </button>
          </li>
        </ul>
      </Navbar>
    </Style>
  )
}

export default Profile
