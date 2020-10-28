import React, { FC, ImgHTMLAttributes } from 'react'
import Style from './styles'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  size: number
}

const Avatar: FC<Props> = ({ size, ...rest }) => {
  return <Style size={size} alt='avatar' draggable={false} className='Avatar' {...rest} />
}

export default Avatar
