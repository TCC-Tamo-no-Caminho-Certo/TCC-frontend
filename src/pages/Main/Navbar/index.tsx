import React, { useState, useCallback, useEffect } from 'react'
import Style, { ProfileOpen, ProfileClosed, UserInfo, Logout, Edit } from './styles'

import avatar from 'assets/avatar.jpg'
import close from 'assets/close.svg'

import anime from 'animejs'
import Anime from '@mollycule/react-anime'
import { FiLogOut } from 'react-icons/fi'
import { BsGear } from 'react-icons/bs'

const Navbar: React.FC = () => {
  const [profilePhoto, setProfilePhoto] = useState<string | boolean>('starting')
  const [openProfile, setOpenProfile] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const onProfileClick = useCallback(() => {
    profilePhoto === 'starting' ? setProfilePhoto(true) : setProfilePhoto(!profilePhoto)
    setOpenProfile(!openProfile)
  }, [profilePhoto, openProfile])

  const profilePhotoAnimation = useCallback(() => {
    anime({
      targets: '#profileButton',
      translateY: [0, '-50%'],
      duration: profilePhoto === 'starting' ? 1000 : 0,
    })

    if (profilePhoto !== 'starting') {
      anime({
        targets: '#profileButton',
        translateX: profilePhoto ? [0, -235] : [-235, 0],
        duration: profilePhoto ? 500 : 1000,
        easing: 'easeInOutSine',
      })
    }
  }, [profilePhoto])

  useEffect(() => profilePhotoAnimation(), [profilePhotoAnimation])

  useEffect(() => {
    setDisabled(true)
    setTimeout(() => {
      setDisabled(false)
    }, 1000)
  }, [openProfile])

  return (
    <Style>
      <Anime
        in={openProfile}
        appear={false}
        duration={500}
        easing='easeInOutSine'
        onEntering={{ translateX: ['320px', 0], opacity: [0, 1] }}
        onExiting={{ translateX: [0, '320px'], opacity: [1, 0] }}
      >
        <ProfileOpen>
          <UserInfo>
            <span id='userRole'>Estudante</span>
            <span id='userName'>Miguel Andrade</span>
            <span id='userActivity'>Online</span>

            <button id='close' type='button' onClick={onProfileClick}>
              <img src={close} draggable='false' alt='close profile' />
            </button>
          </UserInfo>

          <Edit>
            <BsGear size={20} />
            <span>Editar perfil</span>
          </Edit>

          <Logout>
            <span>Logout</span>
            <FiLogOut size={20} />
          </Logout>
        </ProfileOpen>
      </Anime>

      <ProfileClosed
        id='profileButton'
        type='button'
        disabled={disabled}
        onClick={onProfileClick}
      >
        <img src={avatar} alt='profile' draggable='false' />
      </ProfileClosed>
    </Style>
  )
}

export default Navbar
