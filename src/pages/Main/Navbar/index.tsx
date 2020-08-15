import React, { useState, useCallback } from 'react'
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

import Anime from '@mollycule/react-anime'
import { FiLogOut } from 'react-icons/fi'

const Navbar: React.FC = () => {
  const [profileClosed, setProfileClosed] = useState(true)
  const [profileOpen, setProfileOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  const onProfileClick = useCallback(() => {
    setProfileClosed(!profileClosed)
    setProfileOpen(!profileOpen)
  }, [profileClosed, profileOpen])

  const onEditClosedClick = useCallback(() => {
    setEditOpen(!editOpen)
  }, [editOpen])

  return (
    <Style>
      <Anime
        in={profileOpen}
        appear={false}
        duration={300}
        easing='easeInOutSine'
        onEntering={{ translateX: [editOpen ? 470 : 330, 0], opacity: 1 }}
        onExiting={{ translateX: [0, editOpen ? 470 : 330], opacity: 1 }}
        unmountOnExit={false}
      >
        <ProfileOpen editOpen={editOpen}>
          <Anime
            in={editOpen}
            appear={false}
            duration={editOpen ? 400 : 200}
            easing='easeInOutSine'
            onEntering={{ width: [0, 460], height: [0, '50vh'], opacity: [0, 1] }}
            onExiting={{ width: [460, 0], height: ['50vh', 0], opacity: [1, 0] }}
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

          <UserInfo>
            <span id='userRole'>Estudante</span>
            <span id='userName'>Miguel Andrade</span>
            <span id='userActivity'>Online</span>

            <button id='close' type='button' onClick={onProfileClick}>
              <img src={close} draggable='false' alt='close profile' />
            </button>
          </UserInfo>

          <EditClosed onClick={onEditClosedClick}>
            <img src={gear} alt='edit profile' />
            <span>Editar perfil</span>
          </EditClosed>

          <Logout>
            <FiLogOut size={18} />
          </Logout>
        </ProfileOpen>
      </Anime>

      <Anime
        in={profileClosed}
        appear={false}
        duration={700}
        easing='easeInOutSine'
        onEntering={{ translateX: [-220, 0] }}
        onExiting={{ translateX: [0, -220] }}
        unmountOnExit={false}
      >
        <ProfileClosed profileOpen={profileOpen} editOpen={editOpen}>
          <button type='button' onClick={onProfileClick}>
            <img src={avatar} alt='profile' draggable='false' />
          </button>
        </ProfileClosed>
      </Anime>
    </Style>
  )
}

export default Navbar
