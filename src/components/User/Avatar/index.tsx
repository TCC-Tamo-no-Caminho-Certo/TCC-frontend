import React, { FC, ImgHTMLAttributes, memo } from 'react'
import Style from './styles'

import { RootState, useSelector } from 'store'
import { ThemeState } from 'store/theme'

import AvatarIcon from 'assets/Inputs/AvatarIcon'
import CameraIcon from 'assets/Inputs/CameraIcon'

import DotsLoader from 'components/DotsLoader'

import { motion } from 'framer-motion'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size: number
  shadow?: boolean
  onClickInShadow?(): void
  loaderColor?: string
}
const Avatar: FC<AvatarProps> = ({
  size,
  shadow = false,
  onClickInShadow,
  loaderColor = '#fcfcfc',
  ...rest
}) => {
  const avatar = useSelector<RootState, string>(state => state.user.avatar)
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const src = `https://s3.steamslab.com/profile/${avatar}`

  return avatar ? (
    <Style shadow={shadow} size={size} className='Avatar' theme={theme}>
      {avatar === 'default.png' ? (
        <AvatarIcon />
      ) : (
        <img src={src} alt='avatar' draggable={false} {...rest} />
      )}

      {shadow && (
        <motion.div
          className='circle'
          whileHover={{ opacity: [0.7, 0.9] }}
          transition={{ duration: 0.3 }}
          onClick={onClickInShadow}
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
