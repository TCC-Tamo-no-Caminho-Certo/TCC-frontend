import React from 'react'
import Style from './styles'
import GoogleMap from './GoogleMap'
import Navbar from './Navbar'

const Main: React.FC = () => {
  return (
    <Style>
      <GoogleMap />
      <Navbar />
    </Style>
  )
}

export default Main
