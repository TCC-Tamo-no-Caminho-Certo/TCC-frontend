import React, { useEffect, useState } from 'react'
import Style from './styles'

import DateField from './DateField'

import { University as UniversityType } from 'store/Async/universities'
import { RootState } from 'store'
import { UserState } from 'store/Async/user'

import Presence from 'components/Presence'
import Form, { Submit } from 'components/Form'

import { motion, Transition, Variants } from 'framer-motion'
import { useSelector } from 'react-redux'

interface UniversityProps {
  university: UniversityType
}

const transition: Transition = {
  type: 'tween',
  duration: 0.6
}

const seasonInfo: Variants = {
  initial: {
    y: -30,
    opacity: 0
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

const info: Variants = {
  initial: {
    y: -30,
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      ...transition,
      delay: 0.6
    }
  },
  exit: {
    opacity: 0,
    transition
  }
}

const backgroundInfo: Variants = {
  initial: {
    y: -46,
    opacity: 1,
    padding: 0,
    height: 0
  },
  enter: {
    padding: 22,
    y: 0,
    opacity: 1,
    height: 'auto',
    transition: { ...transition, delay: 0.3 }
  },
  exit: {
    y: -46,
    opacity: 1,
    height: 0,
    transition: { ...transition, delay: 0.3 }
  }
}

const University = ({ university }: UniversityProps) => {
  const user = useSelector<RootState, UserState>(({ user }) => user)

  const [selectedSeason, setSelectedSeason] = useState('none')
  const [showInfo, setShowInfo] = useState(false)
  const isAdmin = user.selectedRole === 'admin'

  useEffect(() => {
    console.log(selectedSeason)
  }, [selectedSeason])

  return (
    <Style>
      <motion.button
        className='universityName'
        onClick={() => setShowInfo(!showInfo)}
        initial={{
          borderRadius: '24px 24px 24px 24px'
        }}
        animate={{
          transition: { ...transition, delay: !showInfo ? 0.6 : 0 },
          borderRadius: !showInfo ? '24px 24px 24px 24px' : '24px 24px 0px 0px'
        }}
      >
        {university.name}
      </motion.button>

      <motion.div
        id='info'
        initial='initial'
        animate={showInfo ? 'enter' : 'exit'}
        variants={backgroundInfo}
      >
        <Presence
          exit='exit'
          animate='enter'
          initial='initial'
          variants={info}
          condition={showInfo}
        >
          <div className='season'>
            <Presence
              exit='exit'
              animate='enter'
              initial='initial'
              variants={seasonInfo}
              condition={
                selectedSeason === 'none' || selectedSeason === 'inverno'
              }
            >
              <div
                className='title'
                onClick={() =>
                  selectedSeason === 'inverno'
                    ? setSelectedSeason('none')
                    : setSelectedSeason('inverno')
                }
              >
                Temporada de inverno
              </div>
            </Presence>

            <Presence
              exit='exit'
              animate='enter'
              initial='initial'
              variants={seasonInfo}
              condition={selectedSeason === 'inverno'}
            >
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                quis, sem. Nulla consequat massa quis enim. Donec pede justo,
                fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
                rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum
                felis eu pede mollis pretium. Integer tincidunt. Cras dapibu
              </p>

              <div className='title'>Datas</div>

              <Form>
                <table>
                  <thead>
                    <tr>
                      <th>Período</th>
                      <th>Data de início</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Envio de projetos</td>
                      <td>
                        <DateField name='dispatch' isAdmin={isAdmin} />
                      </td>
                    </tr>
                    <tr>
                      <td>Avaliação de projetos</td>
                      <td>
                        <DateField name='evaluate' isAdmin={isAdmin} />
                      </td>
                    </tr>
                    <tr>
                      <td>Confirmação de participação</td>
                      <td>
                        <DateField name='confirm' isAdmin={isAdmin} />
                      </td>
                    </tr>
                    <tr>
                      <td>Início do projeto</td>
                      <td>
                        <DateField name='in_progress' isAdmin={isAdmin} />
                      </td>
                    </tr>
                    <tr>
                      <td>Conclusão</td>
                      <td>
                        <DateField name='complete' isAdmin={isAdmin} />
                      </td>
                    </tr>
                  </tbody>
                </table>

                {isAdmin && <Submit>Salvar alterações</Submit>}
              </Form>
            </Presence>
          </div>
        </Presence>
      </motion.div>
    </Style>
  )
}

export default University
