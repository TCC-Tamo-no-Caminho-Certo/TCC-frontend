import styled from 'styled-components'

const Style = styled.li`
  button {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 24px;

    color: ${({ theme }) => theme.colors.secondary};

    & + button {
      margin-top: 24px;
    }

    span {
      cursor: pointer;
    }

    #ArrowIcon {
      height: 12px;
      margin-right: 8px;

      fill: ${({ theme }) => theme.colors.secondary};
    }
  }
`

export default Style

Style.displayName = 'List-Style'
