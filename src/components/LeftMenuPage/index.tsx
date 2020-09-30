import React, { useState } from 'react'
import { NavbarBackground, Content, Navbar } from './styles'

import { useSelector, RootState, ThemeState } from 'store'

import Hamburger from 'components/Hamburger'

import anime from 'animejs'
import { Link } from 'react-router-dom'

interface LiProps {
  icon?: string
  label: string
  to: string
}

interface LeftMenuPageProps {
  selected?: string
  openWidth?: number
  closedWidth?: number
  ulData: LiProps[]
}

const LeftMenuPage: React.FC<LeftMenuPageProps> = ({
  selected = 'home',
  openWidth = 210,
  closedWidth = 72,
  ulData,
  children,
}) => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  function onMenuButtonClick() {
    setNavbarOpen(!navbarOpen)

    anime({
      targets: '.label',
      easing: 'easeInOutSine',
      duration: 300,
      translateX: !navbarOpen ? [-closedWidth, 0] : [0, -closedWidth],
      opacity: !navbarOpen ? [0, 1] : [1, 0],
      delay: anime.stagger(50),
    })
  }

  return (
    <>
      <Navbar theme={theme} selected={selected} navbarOpen={navbarOpen} openWidth={openWidth}>
        <NavbarBackground theme={theme} navbarOpen={navbarOpen} openWidth={openWidth} />

        <ul>
          <Hamburger toggle={onMenuButtonClick} />

          {ulData.map(liData => (
            <li id={liData.to} key={liData.to}>
              <Link to={liData.to}>
                <img src={liData.icon} alt='icon' />

                <div className='label'>{navbarOpen && <span>{liData.label}</span>}</div>
              </Link>
            </li>
          ))}
        </ul>
      </Navbar>

      <Content navbarOpen={navbarOpen} openWidth={openWidth}>
        {children}
      </Content>
    </>
  )
}

export default LeftMenuPage
