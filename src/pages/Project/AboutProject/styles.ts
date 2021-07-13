import styled from 'styled-components'
import { StatusType } from 'types/Responses/project'

interface StyleProps {
  status?: StatusType
}

const Style = styled.section<StyleProps>`
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
          margin-right: 4px;

          background-color: ${({ theme }) => {
            switch (status) {
              case 'accepted' || 'completed':
                return theme.colors.green
              case 'refused':
                return theme.colors.red
              case 'in_progress':
                return theme.colors.yellow
              default:
                return theme.colors.gray
            }
          }};
        }
      }
    }
  }

  p {
    margin-top: 24px;
  }
`

export default Style
