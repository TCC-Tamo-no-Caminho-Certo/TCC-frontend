import React from 'react'

import Professor from './Professor'

import Style, { Header } from './styles'
import avatar from 'assets/avatar.jpg'

const dataTypes = {
  Professor
}

type Types = keyof typeof dataTypes

interface Props {
  type: Types
  headerText: string
}

const Card: React.FC<Props> = ({ headerText, type }) => {

  const Data = dataTypes[type]

  return (
    <Style>
      <Header>{headerText}</Header>

      <img src={avatar} alt='avatar' draggable={false} />

      <Data />
    </Style>
  )
}

export default Card
