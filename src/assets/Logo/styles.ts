import styled from 'styled-components'

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 258px;

  svg + svg {
    overflow: visible;
    margin-left: 20px;
  }
`

export default Style
