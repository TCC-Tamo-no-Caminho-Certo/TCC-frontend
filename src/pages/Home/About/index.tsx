import React, { useState, useCallback, useEffect } from 'react'
import Style from './styles'

import { useRegisterSlide } from 'hooks/useRegisterSlide'

const About: React.FC = () => {
  const { registerSlide } = useRegisterSlide()
  const [showAbout, setShowAbout] = useState(true)

  const loginSliderAnimation = useCallback(() => {
    if (registerSlide) {
      setTimeout(() => {
        setShowAbout(false)
      }, 1000)
    } else setShowAbout(true)
  }, [registerSlide])

  useEffect(() => loginSliderAnimation(), [loginSliderAnimation])

  return (
    <>
      {showAbout && (
        <Style>
          <h1>ABOUT</h1>
        </Style>
      )}
    </>
  )
}

export default About
