import styled from 'styled-components'

const Style = styled.div`
  position: relative;

  padding: 8px;
  transition: all 300ms ease;

  label {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    user-select: none;
  }

  input {
    display: none;
  }

  .CheckboxIcon {
    width: 24px;
    margin-right: 8px;
  }
`

export default Style

Style.displayName = 'Radio-Style'
