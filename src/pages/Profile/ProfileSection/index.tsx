import React, { useEffect } from 'react'
import { NavbarBackground, Content, Navbar } from './styles'

import Hamburger from 'components/Hamburger'

import { useNavbarOpen } from 'hooks/useNavbarOpen'

import home from 'assets/ProfileNavbar/home.svg'
import security from 'assets/ProfileNavbar/security.svg'
import historic from 'assets/ProfileNavbar/historic.svg'
import financial from 'assets/ProfileNavbar/financial.svg'
import editProfile from 'assets/ProfileNavbar/editProfile.svg'
import customization from 'assets/ProfileNavbar/customization.svg'

import anime from 'animejs'
import { Link } from 'react-router-dom'

interface ProfileSectionProps {
  selected: string
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ selected, children }) => {
  const { navbarOpen, setNavbarOpen } = useNavbarOpen()

  function onMenuButtonClick() {
    setNavbarOpen(!navbarOpen)

    if (!navbarOpen) {
      anime({
        targets: '#navbarList li div',
        easing: 'easeInOutSine',
        duration: 500,
        opacity: [0, 1],
        translateX: [-20, 0],
        delay: anime.stagger(50),
      })

      anime({
        targets: '.Content',
        easing: 'linear',
        duration: 200,
        width: 'calc(-210px + 100vw)',
        left: 210,
      })
    } else {
      anime({
        targets: '.Content',
        easing: 'linear',
        duration: 200,
        width: 'calc(-72px + 100vw)',
        left: 72,
      })
    }
  }

  useEffect(() => {
    if (navbarOpen) {
      anime({
        targets: ['#navbarBackground', '#navbarList li'],
        easing: 'linear',
        duration: 200,
        width: 210,
      })
    } else {
      anime({
        targets: ['#navbarBackground', '#navbarList li'],
        easing: 'linear',
        duration: 200,
        width: 72,
      })

      anime({
        targets: '.Content',
        easing: 'linear',
        duration: 200,
        width: 'calc(-72px + 100vw)',
        left: 72,
      })
    }
  }, [navbarOpen])

  return (
    <>
      <Navbar selected={selected} navbarOpen={navbarOpen}>
        <NavbarBackground id='navbarBackground' navbarOpen={navbarOpen} />

        <ul id='navbarList'>
          <li id='menuButton'>
            <Hamburger state={navbarOpen} onClick={onMenuButtonClick} />
          </li>

          <li id='home'>
            <Link to='profile'>
              <img src={home} alt='Home' />
              <div>{navbarOpen && <span>Home</span>}</div>
            </Link>
          </li>

          <li id='editProfile'>
            <Link to='editProfile'>
              <img src={editProfile} alt='Editar Perfil' />
              <div>{navbarOpen && <span>Editar Perfil</span>}</div>
            </Link>
          </li>

          <li id='security'>
            <Link to='security'>
              <img src={security} alt='Segurança' />
              <div>{navbarOpen && <span>Segurança</span>}</div>
            </Link>
          </li>

          <li id='customization'>
            <Link to='customization'>
              <img src={customization} alt='Personalização' />
              <div>{navbarOpen && <span>Personalização</span>}</div>
            </Link>
          </li>

          <li id='financial'>
            <Link to='financial'>
              <img src={financial} alt='Personalização' />
              <div>{navbarOpen && <span>Financeiro</span>}</div>
            </Link>
          </li>

          <li id='historic'>
            <Link to='historic'>
              <img src={historic} alt='Histórico' />
              <div>{navbarOpen && <span>Histórico</span>}</div>
            </Link>
          </li>
        </ul>
      </Navbar>

      <Content className='Content' navbarOpen={navbarOpen}>
        {children}
      </Content>
    </>
  )
}

export default ProfileSection
