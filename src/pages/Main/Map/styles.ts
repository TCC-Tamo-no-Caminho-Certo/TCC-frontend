import googleMaps from 'assets/global/googleMaps.png'

import styled from 'styled-components'

const Style = styled.div`
  width: 100%;
  height: 100vh;

  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${googleMaps});
  color: ${({ theme }) => theme.colors.tertiary};
  background-color: ${({ theme }) => theme.colors.secondary};
`

export default Style

Style.displayName = 'Map-Style'
