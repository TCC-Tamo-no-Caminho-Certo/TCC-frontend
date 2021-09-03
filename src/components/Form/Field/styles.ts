import styled from 'styled-components'

export const DefaultField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  .Icon {
    height: 18px;
    cursor: pointer;
    margin-left: 8px;

    fill: ${({ theme }) => theme.colors.primary};
  }
`

export const EditField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  .Text {
    border: none;
    border-radius: 0px;

    input {
      margin: 0;
      padding: 0;
      text-align: center;
    }
  }

  #closeIcon {
    width: 18px;
    height: 100%;
    min-width: 18px;
    margin-left: 4px;

    stroke: ${({ theme }) => theme.colors.primary};
  }

  #icon {
    width: 20px;
    height: 100%;
    min-width: 20px;
    margin-right: 4px;

    fill: ${({ theme }) => theme.colors.primary};
  }
`

DefaultField.displayName = 'DefaultField-Style'
EditField.displayName = 'EditField-Style'
