import styled from 'styled-components'

export const Style = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100%;

  color: ${({ theme }) => theme.colors.secondary};

  .loader {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 48px;
  }
`

export default Style

Style.displayName = 'Table-Style'
