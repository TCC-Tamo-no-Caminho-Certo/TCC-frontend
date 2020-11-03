import React, { FC, ImgHTMLAttributes, memo } from 'react'
import Style from './styles'

import { RootState, useSelector } from 'store'

import defaultAvatar from 'assets/avatar.jpg'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  size: number
}

const Avatar: FC<Props> = ({ size, ...rest }) => {
  const avatar = useSelector<RootState, string>(state => state.user.avatar)

  const src =
    avatar === 'default.png' ? defaultAvatar : `https://s3.steamslab.com/profile/${avatar}`

  return avatar ? (
    <Style size={size} alt='avatar' draggable={false} className='Avatar' src={src} {...rest} />
  ) : (
    <span>loading animation...</span>
  )
}

export default memo(Avatar)
