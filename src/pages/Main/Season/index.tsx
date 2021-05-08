import React, { forwardRef } from 'react'
import Style from './styles'

const Season = forwardRef((props, ref) => (
  <Style ref={ref as any}>
    <header>
      <h1>Temporadas</h1>
    </header>
  </Style>
))

export default Season
