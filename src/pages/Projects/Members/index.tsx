import React, { forwardRef, useEffect, useRef, useState } from 'react'
import Style, { MemberStyle, MonthStyle } from './styles'

import { Role } from 'store/Async/roles'

import ArrowIcon from 'assets/global/ArrowIcon'
import AddButtonIcon from 'assets/global/AddButtonIcon'
import AvatarIcon from 'assets/Inputs/AvatarIcon'

import Presence from 'components/Presence'

import {
  AnimateSharedLayout,
  motion,
  Transition,
  Variants
} from 'framer-motion'

const fakeWork = [
  'Plano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mesPlano de trabalho 1 mes',
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

interface MemberType {
  id: number
  role: Role
  name: string
  works: string[]
}

interface MemberProps {
  member: MemberType
  index: number
  size: number
}

interface MonthProps {
  work: string
  index: number
  size: number
}

const ulAnimation: Variants = {
  initial: {
    transition: {
      staggerChildren: 0.3
    }
  },
  enter: {
    transition: {
      staggerChildren: 0.01
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.01,
      staggerDirection: -1
    }
  }
}

const liAnimation = (index: number, size: number): Variants => {
  const transition: Transition = {
    type: 'tween',
    duration: 0.3
  }

  return {
    initial: {
      y: -size * index + 1,
      opacity: 0
    },
    enter: {
      y: 0,
      opacity: 1,
      transition
    },
    exit: {
      y: -size * index + 1,
      opacity: 0,
      transition
    }
  }
}

const showMonthContent: Variants = {
  initial: {
    y: -30,
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.3
    }
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.3
    }
  },
  exit: {
    y: -30,
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.3
    }
  }
}

const Month = forwardRef<any, MonthProps>(({ work, index, size }, ref) => {
  const [selectedMonth, setSelectedMonth] = useState(-1)

  return (
    <MonthStyle
      layout
      id='month'
      ref={ref as any}
      variants={liAnimation(index, size)}
      onClick={() => {
        setSelectedMonth(prev => (prev === index ? -1 : index))
      }}
    >
      <motion.div layout='position'>{`${index + 1}° Mês`}</motion.div>

      <Presence variants={showMonthContent} condition={selectedMonth === index}>
        <p>{work}</p>
      </Presence>
    </MonthStyle>
  )
})

const Member = forwardRef<any, MemberProps>(({ member, index, size }, ref) => {
  const [selectedMember, setSelectedMember] = useState(-1)
  const [monthSize, setMonthSize] = useState(0)

  const monthRef = useRef<any>(null)

  const { id, name, role, works } = member

  useEffect(() => {
    if (selectedMember === id) setMonthSize(monthRef?.current.clientHeight)
  }, [selectedMember, id])

  return (
    <MemberStyle layout variants={liAnimation(index, size)} ref={ref as any}>
      <motion.div
        layout='position'
        className='header'
        onClick={() => {
          setSelectedMember(prev => (prev === id ? -1 : id))
        }}
      >
        <AvatarIcon />

        <div className='info'>
          <span className='name'>{name}</span>
          <span className='role'>{role}</span>
        </div>

        <ArrowIcon
          initial={{ rotate: 0 }}
          animate={{
            rotate: selectedMember === id ? 0 : -90,
            transition: {
              type: 'tween',
              duration: 0.3
            }
          }}
        />
      </motion.div>

      <Presence
        className='content'
        variants={ulAnimation}
        condition={selectedMember === id}
      >
        <ul>
          {works.map((work, index) => (
            <Month
              work={work}
              index={index}
              key={index}
              ref={monthRef}
              size={monthSize}
            />
          ))}
        </ul>
      </Presence>
    </MemberStyle>
  )
})

const Members = forwardRef((props, ref) => {
  const [showOfficial, setShowOfficial] = useState(false)
  const [showInvited, setShowInvited] = useState(false)
  const [memberSize, setMemberSize] = useState(0)

  const memberRef = useRef<any>(null)

  const members = getMembers()

  useEffect(() => {
    if (showOfficial) setMemberSize(memberRef?.current.clientHeight)
  }, [showOfficial])

  return (
    <Style ref={ref as any}>
      <h1>Lista de participantes</h1>

      <div id='newMember'>
        <AddButtonIcon />

        <span>Convidar participante</span>
      </div>

      <AnimateSharedLayout>
        <ul id='lists'>
          <li>
            <motion.button
              layout='position'
              type='button'
              onClick={() => setShowInvited(!showInvited)}
            >
              <ArrowIcon
                initial={{ rotate: 0 }}
                animate={{
                  rotate: showInvited ? 0 : -90,
                  transition: {
                    type: 'tween',
                    duration: 0.3
                  }
                }}
              />
              <span>Participantes pendentes</span>
            </motion.button>

            <Presence condition={showInvited} variants={ulAnimation}>
              <ul>
                {members.map((member, index) => (
                  <Member
                    ref={memberRef}
                    key={member.id}
                    member={member}
                    index={index}
                    size={memberSize}
                  />
                ))}
              </ul>
            </Presence>
          </li>

          <li>
            <motion.button
              layout='position'
              type='button'
              onClick={() => setShowOfficial(!showOfficial)}
            >
              <ArrowIcon
                initial={{ rotate: 0 }}
                animate={{
                  rotate: showOfficial ? 0 : -90,
                  transition: {
                    type: 'tween',
                    duration: 0.3
                  }
                }}
              />

              <span>Participantes</span>
            </motion.button>

            <Presence condition={showOfficial} variants={ulAnimation}>
              <ul>
                {members.map((member, index) => (
                  <Member
                    ref={memberRef}
                    key={member.id}
                    member={member}
                    index={index}
                    size={memberSize}
                  />
                ))}
              </ul>
            </Presence>
          </li>
        </ul>
      </AnimateSharedLayout>
    </Style>
  )
})

export default Members
