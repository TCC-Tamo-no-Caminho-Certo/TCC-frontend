import React, { ImgHTMLAttributes, memo, useState } from 'react'
import Style, { StyledAvatar } from './styles'

import { RootState } from 'store'

import AvatarIcon from 'assets/Inputs/AvatarIcon'
import CameraIcon from 'assets/Inputs/CameraIcon'

import DotsLoader from 'components/DotsLoader'

import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size: number
  shadow?: boolean
  border?: boolean
  avatarId?: string
  loaderColor?: string
  onClick?(): void
  onShadowClick?(): void
}
const Avatar = ({
  size,
  onShadowClick,
  onClick,
  loaderColor = '#6e4850',
  shadow = false,
  border = false,
  avatarId,
  ...rest
}: AvatarProps) => {
  const avatar = useSelector<RootState, string>(state => state.user.avatar_uuid)
  const condition = avatarId || avatar
  const src = `https://s3.steamslab.com/profile/${condition}`
  const [hovering, setHovering] = useState(false)

  return (
    <Style className='Avatar'>
      {condition ? (
        <StyledAvatar
          size={size}
          border={border}
          shadow={shadow}
          onClick={onClick}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {condition === 'default' ? (
            <AvatarIcon />
          ) : (
            <img src={src} alt='avatar' draggable={false} {...rest} />
          )}

          {shadow && (
            <motion.div
              className='circle'
              onClick={onShadowClick}
              transition={{ duration: 0.3 }}
              animate={{ opacity: hovering ? 0.9 : 0.7 }}
            >
              <CameraIcon />
            </motion.div>
          )}
        </StyledAvatar>
      ) : (
        <DotsLoader color={loaderColor} />
      )}
    </Style>
  )
}

export default memo(Avatar)
