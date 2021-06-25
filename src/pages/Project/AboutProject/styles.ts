import styled from 'styled-components'

const Style = styled.section`
  padding: 24px;

  header {
    div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    #nameStatus {
      #status {
        margin-left: 8px;

        #circle {
          width: 8px;
          height: 8px;
          border-radius: 100%;

          background-color: gray;
          margin-right: 4px;
        }
      }
    }
  }

  p {
    margin-top: 24px;
  }
`

export default Style
