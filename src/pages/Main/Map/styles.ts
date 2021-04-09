import googleMaps from 'assets/global/googleMaps.png'

import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${googleMaps});
  color: ${({ theme }) => theme.colors.tertiary};
  background-color: ${({ theme }) => theme.colors.secondary};
`

export default Style

Style.displayName = 'Map-Style'
