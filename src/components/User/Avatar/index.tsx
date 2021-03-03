import React, { ImgHTMLAttributes, memo, useState } from 'react'
import Style from './styles'

import { RootState } from 'store'

import AvatarIcon from 'assets/Inputs/AvatarIcon'
import CameraIcon from 'assets/Inputs/CameraIcon'

import DotsLoader from 'components/DotsLoader'

import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  onShadowClick?(): void
  onClick?(): void
  size: number
  shadow?: boolean
  loaderColor?: string
  border?: boolean
}
const Avatar = ({
  size,
  onShadowClick,
  onClick,
  loaderColor = '#6e4850',
  shadow = false,
  border = false,
  ...rest
}: AvatarProps) => {
  const avatar = useSelector<RootState, string>(state => state.user.avatar_uuid)

  const src = `https://s3.steamslab.com/profile/${avatar}`

  const [hovering, setHovering] = useState(false)

  return avatar ? (
    <Style
      border={border}
      onClick={onClick}
      shadow={shadow}
      size={size}
      className='Avatar'
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {avatar === 'default' ? (
        <AvatarIcon />
      ) : (
        <img src={src} alt='avatar' draggable={false} {...rest} />
      )}

      {shadow && (
        <motion.div
          className='circle'
          onClick={onShadowClick}
          animate={{ opacity: hovering ? 0.9 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          <CameraIcon />
        </motion.div>
      )}
    </Style>
  ) : (
    <DotsLoader color={loaderColor} />
  )
}

export default memo(Avatar)
