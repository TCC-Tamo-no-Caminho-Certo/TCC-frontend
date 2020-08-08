import React, { useState, useEffect } from 'react'
import Style from './styles'

import { useRegisterSlide } from 'hooks/useRegisterSlide'

const Subscribe: React.FC = () => {
  const [showSubscribe, setShowSubscribe] = useState(false)

  const { registerSlide } = useRegisterSlide()

  useEffect(() => {
    if (registerSlide) setShowSubscribe(true)
    else {
      setTimeout(() => {
        setShowSubscribe(false)
      }, 1000)
    }
  }, [registerSlide])

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
