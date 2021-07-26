import React from 'react'
import Style from './styles'

import transition from 'utils/transition'

import CloseIcon from 'assets/global/CloseIcon'

interface AddCloseIconProps {
  condition: boolean
}

const AddCloseIcon = ({ condition }: AddCloseIconProps) => (
  <Style
    className='AddCloseIcon'
    initial={{ rotate: 45 }}
    animate={{ rotate: condition ? 0 : -45, transition }}
  >
    <CloseIcon />
  </Style>
)

export default AddCloseIcon
