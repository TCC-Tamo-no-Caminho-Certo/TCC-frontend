import styled from 'styled-components'

const Style = styled.div.attrs({
  className: 'Logo',
})`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 80%;

  svg + svg {
    overflow: visible;
    margin-left: 20px;
  }

  @media screen and (min-width: 440px) {
    flex-direction: row;
  }
`

export default Style

Style.displayName = 'Logo-Style'
