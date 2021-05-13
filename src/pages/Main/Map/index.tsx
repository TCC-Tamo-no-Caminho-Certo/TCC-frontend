import React, { forwardRef } from 'react'
import Style from './styles'

const Maps = forwardRef((_props, ref) => <Style ref={ref as any} />)

export default Maps
