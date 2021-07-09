import styled from 'styled-components'

export const DefaultField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  cursor: pointer;

  .Icon {
    height: 18px;
    margin-right: 16px;

    fill: ${({ theme }) => theme.colors.primary};
  }
`

export const EditField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 8px;
  cursor: pointer;

  .Text {
    border: none;
    min-width: 32px;
    border-radius: 0px;

    input {
      margin: 0;
      padding: 0px;
      text-align: center;
    }
  }

  #closeIcon {
    width: 18px;
    min-width: 18px;
    margin-left: 4px;

    stroke: ${({ theme }) => theme.colors.primary};
  }

  #icon {
    width: 20px;
    min-width: 20px;
    margin-right: 4px;

    fill: ${({ theme }) => theme.colors.primary};
  }
`

const Style = styled.div``

export default Style

Style.displayName = 'Component-Style'
EditField.displayName = 'EditField-Style'
DefaultField.displayName = 'DefaultField-Style'
