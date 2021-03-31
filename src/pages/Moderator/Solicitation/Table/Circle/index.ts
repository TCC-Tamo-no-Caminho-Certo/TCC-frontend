import { getStatusColor, StatusTypes } from 'utils/status'

import styled from 'styled-components'

interface CircleProps {
  status?: StatusTypes
}

const Circle = styled.div<CircleProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;

  background-color: ${({ theme, status }) => getStatusColor(theme, status)};
`

export default Circle

Circle.displayName = 'Circle-Style'
