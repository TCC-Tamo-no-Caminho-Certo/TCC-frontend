import styled from 'styled-components'

const Style = styled.button`
  display: flex;
  align-items: center;

  color: #6e4850;
  transition: all 0.2s;

  &:hover {
    color: #d65881;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`

export default Style
