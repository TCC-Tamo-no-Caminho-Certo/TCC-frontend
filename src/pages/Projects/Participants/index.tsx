import React, { forwardRef, useState } from 'react'
import Style from './styles'

import ArrowIcon from 'assets/global/ArrowIcon'
import AddButtonIcon from 'assets/global/AddButtonIcon'
import AvatarIcon from 'assets/Inputs/AvatarIcon'

import Presence from 'components/Presence'

import { motion, Variants } from 'framer-motion'

const showParticipants: Variants = {
  initial: {
    transition: {
      type: 'tween',
      duration: 0.3,
      staggerChildren: 0.3
    }
  },
  enter: {
    transition: {
      type: 'tween',
      duration: 0.3,
      staggerChildren: 0.2
    }
  },
  exit: {
    transition: {
      type: 'tween',
      duration: 0.3,
      staggerChildren: 0.1
    }
  }
}

const showOneParticipant: Variants = {
  initial: {
    opacity: 0,
    y: -72,
    transition: {
      type: 'tween',
      duration: 0.3
    }
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    y: -72,
    transition: {
      type: 'tween',
      duration: 0.3
    }
  }
}

const Project = forwardRef((props, ref) => {
  const [showOfficial, setShowOfficial] = useState(false)
  const [showInvited, setShowInvited] = useState(false)

  return (
    <Style ref={ref as any}>
      <h1>Lista de participantes</h1>

      <div id='newMember'>
        <AddButtonIcon />

        <span>Convidar participante</span>
      </div>

      <ul>
        <li>
          <button type='button' onClick={() => setShowInvited(!showInvited)}>
            <ArrowIcon />

            <span>Participantes pendentes</span>
          </button>

          <Presence
            exit='exit'
            initial='initial'
            animate='enter'
            condition={showInvited}
            variants={showParticipants}
          >
            <ul>
              <motion.li variants={showOneParticipant}>
                <AvatarIcon />

                <div className='info'>
                  <span className='name'>Miguel A.</span>
                  <span className='role'>Estudante</span>
                </div>

                <ArrowIcon />
              </motion.li>

              <motion.li variants={showOneParticipant}>
                <AvatarIcon />

                <div className='info'>
                  <span className='name'>Miguel A.</span>
                  <span className='role'>Estudante</span>
                </div>

                <ArrowIcon />
              </motion.li>
            </ul>
          </Presence>
        </li>

        <li>
          <button type='button' onClick={() => setShowOfficial(!showOfficial)}>
            <ArrowIcon />

            <span>Participantes</span>
          </button>

          <Presence
            initial='initial'
            animate='enter'
            exit='exit'
            condition={showOfficial}
            variants={showParticipants}
          >
            <ul>
              <motion.li variants={showOneParticipant}>
                <AvatarIcon />

                <div className='info'>
                  <span className='name'>Miguel A.</span>
                  <span className='role'>Estudante</span>
                </div>

                <ArrowIcon />
              </motion.li>

              <motion.li variants={showOneParticipant}>
                <AvatarIcon />

                <div className='info'>
                  <span className='name'>Miguel A.</span>
                  <span className='role'>Estudante</span>
                </div>

                <ArrowIcon />
              </motion.li>
            </ul>
          </Presence>
        </li>
      </ul>
    </Style>
  )
})

export default Project
