import React, { useState, useEffect, useCallback } from 'react'
import Style from './styles'

import { useRegisterSlide } from 'hooks/useRegisterSlide'

const Subscribe: React.FC = () => {
  const { registerSlide } = useRegisterSlide()
  const [showSubscribe, setShowSubscribe] = useState(false)

  const SubscribeSliderAnimation = useCallback(() => {
    if (registerSlide) setShowSubscribe(true)
    else {
      setTimeout(() => {
        setShowSubscribe(false)
      }, 1000)
    }
  }, [registerSlide])

  useEffect(() => SubscribeSliderAnimation(), [SubscribeSliderAnimation])

  return (
    <>
      {showSubscribe && (
        <Style>
          <h1>SUBSCRIBE</h1>
        </Style>
      )}
    </>
  )
}

export default Subscribe
