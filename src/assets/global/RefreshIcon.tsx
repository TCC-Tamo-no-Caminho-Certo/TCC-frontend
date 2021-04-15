import React, { useState } from 'react'

import { motion, Variants } from 'framer-motion'

const RefreshIcon = ({ onClick, ...props }: any) => {
  const [refreshAnimate, cycle] = useState(false)
  const onRefreshClick = async () => {
    cycle(true)
    await onClick()
    cycle(false)
  }

  const refresh: Variants = {
    animate: {
      rotate: [0, -360],
      transition: {
        type: 'tween',
        ease: 'linear',
        repeat: Infinity
      }
    },

    none: {
      rotate: -360,
      transition: {
        type: 'tween',
        ease: 'linear'
      }
    }
  }

  return (
    <svg
      variants={refresh}
      animate={refreshAnimate ? 'animate' : 'none'}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      className='Icon'
      id='RefreshIcon'
      viewBox='0 0 594 572'
      onClick={onRefreshClick}
      style={{
        overflow: 'visible'
      }}
      {...props}
    >
      <motion.path
        variants={refresh}
        animate={refreshAnimate ? 'animate' : 'none'}
        d='M312.056 0C196.835 0 97.867 70.616 54.206 171.285l-29.058-11.64a18.294 18.294 0 00-19.921 4.198c-5.182 5.316-6.668 13.208-3.75 20.009l46.225 107.975c1.922 4.457 5.509 8 10.035 9.799a18.116 18.116 0 0014.018-.163l108.021-46.205c6.805-2.903 11.182-9.636 11.1-17.051a18.332 18.332 0 00-11.509-16.778l-36.625-14.666c29.48-65.6 94.154-111.355 169.3-111.355 102.84 0 186.509 85.486 186.509 190.585s-83.696 190.599-186.509 190.599c-45.666 0-87.445-16.901-119.843-44.897-18.913-16.328-47.071-15.551-64.674 2.195-.232.245-.45.449-.682.695-19.404 19.518-17.999 51.329 2.823 69.293C178.849 546.322 242.528 572 312.042 572 467.502 572 594 443.717 594 285.993 594.027 128.297 467.529 0 312.056 0z'
      />
    </svg>
  )
}

export default RefreshIcon
