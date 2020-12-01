// import fromTheme from 'utils/fromTheme'

import googleMaps from 'assets/googleMaps.png'

import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

  background-color: #fcfcfc;
  color: #6e4850;
  background-image: url(${googleMaps});
  background-repeat: no-repeat;

  background-size: cover;
`

export default Style

Style.displayName = 'Map-Style'
