import { darken } from 'polished'
import styled from 'styled-components'

const Style = styled.section`
  padding: 24px;

  #newMember {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 24px;
    padding: 8px;
    border-radius: 8px;
    width: 250px;

    background-color: ${({ theme }) => darken(0.1, theme.colors.tertiary)};
    box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.39);

    background-color: ${({ theme }) => theme.colors.primary};

    .Icon {
      overflow: visible;
      margin-right: 8px;
    }

    span {
      width: 110px;
      text-align: center;
    }
  }

  ul {
    margin-top: 24px;

    li + li {
      margin-top: 24px;
    }

    li {
      button {
        display: flex;
        justify-content: center;
        align-items: center;

        color: ${({ theme }) => theme.colors.secondary};

        & + button {
          margin-top: 24px;
        }

        span {
          cursor: pointer;
        }

        #ArrowIcon {
          height: 8px;
          margin-right: 8px;

          fill: ${({ theme }) => theme.colors.secondary};
        }
      }

      ul {
        li {
          display: flex;
          justify-content: center;
          align-items: center;

          padding: 8px;
          border-radius: 8px;
          width: 250px;

          background-color: ${({ theme }) =>
            darken(0.1, theme.colors.tertiary)};
          box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.39);

          .info {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;

            margin-right: 16px;
          }

          #DefaultAvatar {
            height: 72px;
            margin-right: 16px;
          }

          #ArrowIcon {
            height: 18px;

            fill: ${({ theme }) => theme.colors.secondary};
          }
        }
      }
    }
  }
`

export default Style
