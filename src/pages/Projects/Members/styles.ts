import styled from 'styled-components'

const Style = styled.section`
  padding: 24px;
  * {
    /* border: solid red 1px; */
  }
  #newMember {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 24px;
    margin-top: 24px;
    border-radius: 8px;

    box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.39);
    background-color: ${({ theme }) => theme.colors.primary};

    span {
      text-align: center;
    }

    .Icon {
      overflow: visible;
      margin-right: 8px;
    }
  }

  #lists {
    margin-top: 24px;

    li + li {
      margin-top: 24px;
    }
  }
`

export default Style

Style.displayName = 'Members-Style'
