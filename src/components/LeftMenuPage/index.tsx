import React from 'react'
import { NavbarBackground, Content, Navbar } from './styles'

import Li, { LiProps } from './Li'

import Hamburger from 'components/Hamburger'

import { useNavbarOpen } from 'hooks/useNavbarOpen'

import anime from 'animejs'

interface LeftMenuPageProps {
  selected?: string
  width?: number
  ulData: LiProps[]
}

const LeftMenuPage: React.FC<LeftMenuPageProps> = ({
  selected = 'home',
  width = 210,
  ulData,
  children,
}) => {
  const { navbarOpen, setNavbarOpen } = useNavbarOpen()

  function onMenuButtonClick() {
    setNavbarOpen(!navbarOpen)

    if (navbarOpen) {
      anime({
        targets: ['#navbarBackground', '.Li'],
        duration: 200,
        easing: 'easeInOutSine',
        width: [width, 72],
      })

      anime({
        targets: '.Content',
        easing: 'linear',
        duration: 200,
        width: 'calc(-72px + 100vw)',
        left: 72,
      })
    } else {
      anime({
        targets: '#navbarList a div',
        duration: 200,
        easing: 'linear',
        translateX: [-10, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
      })

      anime({
        targets: ['#navbarBackground', '.Li'],
        duration: 200,
        easing: 'easeInOutSine',
        width: [72, width],
      })

      anime({
        targets: '.Content',
        easing: 'linear',
        duration: 200,
        width: `calc(-${width}px + 100vw)`,
        left: width,
      })
    }
  }

  return (
    <>
      <Navbar selected={selected} navbarOpen={navbarOpen} openWidth={width}>
        <NavbarBackground
          className='navbar'
          id='navbarBackground'
          navbarOpen={navbarOpen}
          openWidth={width}
        />

        <ul className='navbar'>
          <Hamburger state={!navbarOpen} onClick={onMenuButtonClick} />

          {ulData.map(liData => (
            <Li key={liData.to} icon={liData.icon} label={liData.label} to={liData.to} />
          ))}
        </ul>
      </Navbar>

      <Content className='Content' navbarOpen={navbarOpen} openWidth={width}>
        {children}
      </Content>
    </>
  )
}

export default LeftMenuPage
