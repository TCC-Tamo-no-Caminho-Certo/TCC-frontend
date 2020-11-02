import React, { FC, ImgHTMLAttributes, memo } from 'react'
import Style from './styles'

import { RootState, useSelector } from 'store'

import avat from 'assets/avatar.jpg'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  size: number
}

const Avatar: FC<Props> = ({ size, ...rest }) => {
  const avatar = useSelector<RootState, string>(state => state.user.avatar)
  return (
    <Style
      size={size}
      alt='avatar'
      draggable={false}
      className='Avatar'
      src={avat || avatar}
      {...rest}
    />
  )
}

export default memo(Avatar)
