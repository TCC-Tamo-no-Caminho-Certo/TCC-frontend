import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Style, { Content } from './styles'

import { SeasonType } from '../..'
import DatesTable from './DatesTable'

import ArrowIcon from 'assets/global/ArrowIcon'
import DownloadIcon from 'assets/global/Download'
import CalendarIcon from 'assets/global/CalendarIcon'

import { Datepicker, File, Submit, Textarea } from 'components/Form'

import { motion, Transition, Variants } from 'framer-motion'

interface SeasonProps {
  id: string
  season: SeasonType
  selecteds?: string[]
  setSelecteds?: Dispatch<SetStateAction<string[] | undefined>>
}

const transition: Transition = { type: 'tween', duration: 0.3 }

const arrowAnimation: Variants = {
  down: { rotate: 0 },
  initial: { rotate: 0 },
  right: { rotate: -90 }
}

const titleAnimation: Variants = {
  initial: { borderRadius: '16px 16px 16px 16px' },
  unrounded: { borderRadius: '16px 16px 0px 0px', transition },
  rounded: {
    borderRadius: '16px 16px 16px 16px',
    transition: { ...transition, delay: 0.3 }
  }
}

const contentAnimation: Variants = {
  initial: { height: 0, opacity: 0, overflow: 'hidden' },
  exit: { height: 0, opacity: 0, overflow: 'hidden', transition },
  enter: {
    overflow: 'visible',
    opacity: 1,
    height: 'auto',
    transition: { ...transition, delay: 0.1 }
  }
}

const Season = ({
  id,
  selecteds,
  setSelecteds,
  season: { title, description, begin, edict, periods }
}: SeasonProps) => {
  const [disabled, setDisabled] = useState(false)

  const isAdmin = true

  const isSelected =
    selecteds?.find(season_id => season_id === id) !== undefined

  const onTitleClick = () => {
    setSelecteds &&
      setSelecteds(prev => {
        if (isSelected) return prev?.filter(currPrev => currPrev !== id)
        return prev ? [...prev, id] : [id]
      })
  }

  useEffect(() => {
    setDisabled(true)
    setTimeout(() => setDisabled(false), 400)
  }, [isSelected])

  return (
    <Style>
      <motion.button
        type='button'
        id='seasonTitle'
        initial='initial'
        disabled={disabled}
        onClick={onTitleClick}
        variants={titleAnimation}
        animate={isSelected ? 'unrounded' : 'rounded'}
      >
        <ArrowIcon
          initial='initial'
          variants={arrowAnimation}
          animate={isSelected ? 'down' : 'right'}
        />

        <span>{title}</span>
      </motion.button>

      <Content condition={isSelected} variants={contentAnimation}>
        {isAdmin ? (
          <Textarea
            name='description'
            placeholder='Descrição'
            defaultValue={description}
          />
        ) : (
          <p>{description}</p>
        )}

        {isAdmin ? (
          <div id='beginDatepicker'>
            <div id='label'> Início da temporada:</div>
            <Datepicker name='begin' placeholder={begin} icon={CalendarIcon} />
          </div>
        ) : (
          <div id='beginDate'>Início da temporada: {begin}</div>
        )}

        <DatesTable isAdmin={isAdmin} periods={periods} />

        {isAdmin ? (
          <>
            <File name='edict' label='Enviar Edital' />

            <Submit>Salvar alterações</Submit>
          </>
        ) : (
          <a download href={edict} id='edict'>
            <DownloadIcon /> Baixar edital
          </a>
        )}
      </Content>
    </Style>
  )
}

export default Season
