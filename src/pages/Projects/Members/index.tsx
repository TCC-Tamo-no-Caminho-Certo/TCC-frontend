import React, { forwardRef } from 'react'
import Style from './styles'

import List from './List'

import { Role } from 'store/Async/roles'

import AddButtonIcon from 'assets/global/AddButtonIcon'

import { AnimateSharedLayout, motion } from 'framer-motion'

interface MemberType {
  id: number
  role: Role
  name: string
  works: string[]
}

const fakeWork = [
  'Plano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de tPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mes',
  'Plano de trabalho 2 mes',
  'Plano de trabalho 3 mes',
  'Plano de trabalho 4 mes',
  'Plano de trabalho 5 mes',
  'Plano de trabalho 6 mes',
  'Plano de trabalho 7 mes',
  'Plano de trabalho 8 mes',
  'Plano de trabalho 9 mes',
  'Plano de trabalho 10 mes'
]

const getMembers = (): MemberType[] => {
  return [
    {
      works: fakeWork,
      name: 'Miguel',
      role: 'student',
      id: 2077
    },
    {
      works: fakeWork,
      name: 'Gabriel',
      role: 'student',
      id: 2078
    },
    {
      works: fakeWork,
      name: 'Jean',
      role: 'student',
      id: 2079
    },
    {
      works: fakeWork,
      name: 'João',
      role: 'student',
      id: 2080
    },
    {
      works: fakeWork,
      name: 'André',
      role: 'student',
      id: 2081
    }
  ]
}

const getInvitedMembers = (): MemberType[] => {
  return [
    {
      works: fakeWork,
      name: 'Miguel',
      role: 'student',
      id: 20771
    },
    {
      works: fakeWork,
      name: 'Gabriel',
      role: 'student',
      id: 20781
    },
    {
      works: fakeWork,
      name: 'Jean',
      role: 'student',
      id: 20791
    },
    {
      works: fakeWork,
      name: 'João',
      role: 'student',
      id: 20801
    },
    {
      works: fakeWork,
      name: 'André',
      role: 'student',
      id: 20811
    }
  ]
}

const Members = forwardRef((props, ref) => (
  <Style ref={ref as any}>
    <motion.div>
      <h1>Lista de participantes</h1>

      <div id='newMember'>
        <AddButtonIcon />

        <span>Convidar participante</span>
      </div>
    </motion.div>

    <ul id='lists'>
      <List members={getMembers()} title='Participantes convidados' />

      <List members={getInvitedMembers()} title='Participantes' />
    </ul>
  </Style>
))

export default Members
