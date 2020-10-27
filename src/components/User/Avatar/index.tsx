import React, { FC, ImgHTMLAttributes } from 'react'
import Style from './styles'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  size: number
}

const Avatar: FC<Props> = ({ size, ...rest }) => {
  return (
    <Style size={size}>
      <img alt='avatar' draggable={false} {...rest} />
    </Style>
  )
}

export default Avatar
