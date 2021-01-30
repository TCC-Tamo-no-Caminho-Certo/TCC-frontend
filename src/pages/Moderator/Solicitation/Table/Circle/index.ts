import { StatusTypes } from '../index'

import styled from 'styled-components'

interface CircleProps {
  status?: StatusTypes
}

const Circle = styled.div<CircleProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;

  background-color: ${({ theme, status }) => {
    switch (status) {
      case 'accepted':
        return theme.colors.green
      case 'awaiting':
        return theme.colors.yellow
      case 'rejected':
        return theme.colors.red
      default:
        return theme.colors.white
    }
  }};
`

export default Circle

Circle.displayName = 'Circle-Style'
