import React, { useState, useCallback, useEffect } from 'react'
import Style, {
  ProfileOpen,
  ProfileClosed,
  UserInfo,
  Logout,
  EditClosed,
  EditOpen,
  PhotoChange,
} from './styles'

import ContainerChange from './ContainerChange'

import Button from 'components/Button'

import gear from 'assets/gear.svg'
import close from 'assets/close.svg'
import avatar from 'assets/avatar.jpg'
import upload from 'assets/upload.svg'

import { FiLogOut } from 'react-icons/fi'
import Anime from '@mollycule/react-anime'
import anime from 'animejs'

const Navbar: React.FC = () => {
  const [profileOpen, setProfileOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  const profileOpenToggle = () =>
    profileOpen ? setProfileOpen(false) : setProfileOpen(true)

  const EditOpenToggle = () => {
    if (editOpen) {
      anime({
        targets: '.ProfileOpen',
        easing: 'easeInOutSine',
        duration: 300,
        width: [460, 320],
        delay: 500,
      })

      anime({
        targets: '.ProfileClosed',
        easing: 'easeInOutSine',
        duration: 300,
        translateX: [-360, -220],
        delay: 500,
      })
    } else {
      anime({
        targets: '.ProfileOpen',
        easing: 'easeInOutSine',
        duration: 300,
        width: [320, 460],
      })

      anime({
        targets: '.ProfileClosed',
        easing: 'easeInOutSine',
        duration: 300,
        translateX: [-220, -360],
      })
    }

    editOpen ? setEditOpen(false) : setEditOpen(true)
  }

  return (
    <Style>
      <Anime
        in={profileOpen}
        appear={false}
        duration={500}
        unmountOnExit={false}
        easing='easeInOutSine'
        onEntering={{ translateX: editOpen ? [140, -325] : [0, -325] }}
        onExiting={{ translateX: editOpen ? [-325, 140] : [-325, 0] }}
      >
        <ProfileOpen>
          <Anime
            in={editOpen}
            appear={false}
            duration={500}
            unmountOnExit={false}
            easing='easeInOutSine'
            onEntering={{ height: [0, '50vh'], opacity: [0, 1] }}
            onExiting={{ height: ['50vh', 0], opacity: [1, 0] }}
          >
            <EditOpen>
              <hr />

              <PhotoChange>
                <img src={avatar} alt='profile' draggable='false' />

                <Button>
                  <img src={upload} alt='upload' />
                  Alterar imagem
                </Button>
              </PhotoChange>

              <ContainerChange label='Função:' value='Estudante' />

              <ContainerChange label='Nome:' value='Miguel' />

              <ContainerChange label='Sobrenome:' value='Miguel Andrade' />

              <ContainerChange label='E-mail:' value='miguelandradebarreto2@gmail.com' />

              <ContainerChange label='Data de nascimento:' value='19/08/2001' />
            </EditOpen>
          </Anime>

          <EditClosed onClick={EditOpenToggle}>
            <img src={gear} alt='edit profile' />
            <span>Editar perfil</span>
          </EditClosed>

          <UserInfo>
            <span id='userRole'>Estudante</span>
            <span id='userName'>Miguel Andrade</span>
            <span id='userActivity'>Online</span>

            <button id='close' type='button' onClick={profileOpenToggle}>
              <img src={close} draggable='false' alt='close profile' />
            </button>
          </UserInfo>

          <Logout>
            <FiLogOut size={18} />
          </Logout>
        </ProfileOpen>
      </Anime>

      <Anime
        in={!profileOpen}
        appear={false}
        duration={500}
        unmountOnExit={false}
        easing='easeInOutSine'
        onEntering={{ translateX: editOpen ? [-360, 0] : [-220, 0] }}
        onExiting={{ translateX: editOpen ? [0, -360] : [0, -220] }}
      >
        <ProfileClosed>
          <button type='button' onClick={profileOpenToggle}>
            <img src={avatar} alt='profile' draggable='false' />
          </button>
        </ProfileClosed>
      </Anime>
    </Style>
  )
}

export default Navbar
