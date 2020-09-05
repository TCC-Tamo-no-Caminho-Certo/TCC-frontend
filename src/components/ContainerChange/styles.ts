import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

const Style = styled.div`
  width: 647px;
  height: 53px;
  font-size: 1.5rem;
  border-radius: 5px;
  border: solid 1px ${fromTheme('tertiary')};

  display: grid;
  grid: 'labels value change' 100%/15% 70% 15%;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;

    span {
      text-align: center;
      overflow-wrap: break-word;
      min-width: 100%;
    }
  }
`

export const Label = styled.div`
  grid-area: labels;
`

export const Value = styled.div`
  grid-area: value;
`

export const Change = styled.div`
  grid-area: change;
  color: ${fromTheme('primary')};
`

export default Style
