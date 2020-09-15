import styled from 'styled-components'

const Style = styled.li.attrs({
  className: 'Li',
})`
  z-index: 2;

  a {
    display: flex;
    align-items: center;

    width: 100%;
    height: 70px;
    padding: 0 24px;

    div {
      margin-left: 24px;

      color: white;
      white-space: nowrap;
    }
  }
`

export default Style
