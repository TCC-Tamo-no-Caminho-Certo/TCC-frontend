import React, { FC, ImgHTMLAttributes, memo } from 'react'
import Style from './styles'

import { RootState, useSelector } from 'store'
import { ThemeState } from 'store/theme'

import defaultAvatar from 'assets/avatar.jpg'
import Camera from 'assets/Camera'

import { motion } from 'framer-motion'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size: number
  shadow?: boolean
  onClickInShadow?(): void
}
const Avatar: FC<AvatarProps> = ({ size, shadow = false, onClickInShadow, ...rest }) => {
  const avatar = useSelector<RootState, string>(state => state.user.avatar)
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <Style shadow={shadow} size={size} draggable={false} className='Avatar' theme={theme}>
      <img src={defaultAvatar || avatar} alt='avatar' {...rest} />

      {shadow && (
        <motion.div
          className='circle'
          whileHover={{ opacity: [0.7, 0.9] }}
          transition={{ duration: 0.3 }}
          onClick={onClickInShadow}
        >
          <Camera />
        </motion.div>
      )}
    </Style>
  )
}

export default memo(Avatar)
