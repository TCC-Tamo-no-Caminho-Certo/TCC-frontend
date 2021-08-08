import React, { ImgHTMLAttributes, memo, useState } from 'react'
import Style, { StyledAvatar } from './styles'

import { RootState } from 'store'
import { AsyncUserState } from 'store/Async/user'

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
  withLoader?: boolean
  onClick?(): void
  onShadowClick?(): void
}
const Avatar = ({
  size,
  onClick,
  avatarId,
  onShadowClick,
  shadow = false,
  border = false,
  withLoader = true,
  loaderColor = '#6e4850',
  ...rest
}: AvatarProps) => {
  const { user } = useSelector<RootState, AsyncUserState>(
    ({ asyncUser }) => asyncUser
  )

  const [hovering, setHovering] = useState(false)

  const condition = avatarId || user?.avatar_uuid
  const src = `https://s3.steamslab.com/profile/${condition}`

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
            <img alt='avatar' src={src} draggable={false} {...rest} />
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
        withLoader && <DotsLoader color={loaderColor} />
      )}
    </Style>
  )
}

export default memo(Avatar)
