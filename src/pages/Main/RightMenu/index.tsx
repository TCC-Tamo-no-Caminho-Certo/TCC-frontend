import React, { useState, useEffect } from 'react'
import Style, { AnimationShape, ProfileOpen, UserInfo, Logout, Edit } from './styles'

import avatar from 'assets/avatar.jpg'
import close from 'assets/close.svg'
import gear from 'assets/gear.svg'

import { ThemeState } from 'store/theme'
import { RootState, useSelector } from 'store'

import anime from 'animejs'
import Anime from '@mollycule/react-anime'
import { FiLogOut as LogoutIcon } from 'react-icons/fi'

const RightMenu: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const totalWidth = document.getElementById('AnimationShape')?.clientWidth as number
  const totalHeight = document.getElementById('AnimationShape')?.clientHeight as number
  const offset = 5
  const cyTop = 50 + offset
  const cxRight = totalWidth - 65 + offset

  const [profileOpen, setProfileOpen] = useState(false)

  useEffect(() => {
    anime({ targets: '#profileButton', duration: 0, translateY: '-50%' })
  }, [])

  useEffect(() => {
    anime({
      targets: ['#closeButton', '.UserInfo span', '.Edit', '.Logout'],
      easing: 'easeInOutSine',
      duration: 400,
      delay: anime.stagger(100),
      translateX: [100, 0],
      opacity: [0, 1],
    })
  }, [profileOpen])

  return (
    <Style>
      <AnimationShape id='AnimationShape'>
        <Anime
          in={profileOpen}
          appear={false}
          duration={300}
          easing='linear'
          onEntering={{
            targets: '#AnimationShape path',
            fillOpacity: '1',
            d: `M${-totalHeight}, ${totalHeight / 2} a${totalWidth},${totalWidth} 0 1,1 ${
              totalWidth * 2
            },0a ${totalWidth},${totalWidth} 0 1,1 ${totalWidth * -2},0`,
          }}
          onExiting={{
            targets: '#AnimationShape path',
            fillOpacity: '0',
            d: `M${cxRight},${cyTop} a 0,0 0 1,1 0,0 a 0,0 0 1,1 0,0`,
          }}
        >
          <svg>
            <path
              fill={theme.quaternary}
              d={`M${cxRight},${cyTop} a 0,0 0 1,1 0,0 a 0,0 0 1,1 0,0`}
            />
          </svg>
        </Anime>
      </AnimationShape>

      <Anime
        in={!profileOpen}
        appear={false}
        duration={500}
        unmountOnExit={false}
        easing='easeInOutSine'
        onEntering={{ translateX: [-200, 0] }}
        onExiting={{ translateX: [0, -200] }}
      >
        <button type='button' id='profileButton' onClick={() => setProfileOpen(!profileOpen)}>
          <img src={avatar} id='profileImage' alt='profile' draggable='false' />
        </button>
      </Anime>

      {profileOpen && (
        <ProfileOpen theme={theme}>
          <Edit to='/profile'>
            <img src={gear} alt='edit profile' />
            <span>Editar perfil</span>
          </Edit>

          <UserInfo theme={theme}>
            <span id='userRole'>Estudante</span>
            <span id='userName'>Miguel Andrade</span>
            <span id='userActivity'>Online</span>
          </UserInfo>

          <Logout>
            <span>Logout</span>
            <LogoutIcon size={18} />
          </Logout>

          <button type='button' id='closeButton' onClick={() => setProfileOpen(!profileOpen)}>
            <img src={close} draggable='false' alt='close profile' />
          </button>
        </ProfileOpen>
      )}
    </Style>
  )
}

export default RightMenu
