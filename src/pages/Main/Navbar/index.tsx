import React, { useState, useEffect } from 'react'
import Style, {
  ProfileOpen,
  ProfileClosed,
  UserInfo,
  Logout,
  EditClosed,
  EditOpen,
  PhotoChange,
  MenuClosed,
  MenuOpen,
} from './styles'

import ContainerChange from './ContainerChange'

import Button from 'components/Forms/Button'

import gear from 'assets/gear.svg'
import close from 'assets/close.svg'
import avatar from 'assets/avatar.jpg'
import upload from 'assets/upload.svg'
import hamburguer from 'assets/hamburguer.svg'

import { FiLogOut } from 'react-icons/fi'
import Anime from '@mollycule/react-anime'
import anime from 'animejs'

import { useHistory } from 'react-router-dom'
import api from 'services/api'

const Navbar: React.FC = () => {
  const [profileOpen, setProfileOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const history = useHistory()

  const menuOpenToggle = () => {
    menuOpen ? setMenuOpen(false) : setMenuOpen(true)
  }

  const profileOpenToggle = () => {
    profileOpen ? setProfileOpen(false) : setProfileOpen(true)
  }

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

  useEffect(() => {
    setDisabled(true)
    setTimeout(() => {
      setDisabled(false)
    }, 550)
  }, [editOpen, profileOpen])

  const onLogoutClick = async () => {
    const token = localStorage.getItem('@SLab_ac_token')
    await api.get('logout', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    history.push('/')
  }

  return (
    <Style>
      {menuOpen && <MenuOpen />}

      <MenuClosed type='button' onClick={menuOpenToggle}>
        <img src={hamburguer} alt='menu' />
      </MenuClosed>

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
            onEntering={{ height: [0, '50vh'], opacity: [0, 1], delay: 200 }}
            onExiting={{ height: ['50vh', 0], opacity: [1, 0] }}
          >
            <EditOpen>
              <hr />

              <div className='scroll'>
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
              </div>
            </EditOpen>
          </Anime>

          <EditClosed onClick={EditOpenToggle} disabled={disabled}>
            <img src={gear} alt='edit profile' />
            <span>Editar perfil</span>
          </EditClosed>

          <UserInfo>
            <span id='userRole'>Estudante</span>
            <span id='userName'>Miguel Andrade</span>
            <span id='userActivity'>Online</span>

            <button id='close' type='button' onClick={profileOpenToggle} disabled={disabled}>
              <img src={close} draggable='false' alt='close profile' />
            </button>
          </UserInfo>

          <Logout onClick={onLogoutClick}>
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
        <ProfileClosed type='button' onClick={profileOpenToggle} disabled={disabled}>
          <img src={avatar} alt='profile' draggable='false' />
        </ProfileClosed>
      </Anime>
    </Style>
  )
}

export default Navbar
