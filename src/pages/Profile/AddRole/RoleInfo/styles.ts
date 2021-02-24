import styled from 'styled-components'

interface StyleProps {
  color: string
  show: boolean
  title: string
}

const Style = styled.div<StyleProps>`
  grid-area: ${({ title }) => title};

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  width: 300px;
  margin-top: 24px;

  #title {
    display: flex;
    align-items: center;

    margin-bottom: 16px;
    -webkit-user-select: none;
    cursor: pointer;

    color: ${({ color }) => color};

    span {
      font-size: clamp(2rem, 0.6rem + 2.6vw, 2.5rem);
    }

    .Icon {
      width: 18px;
      height: 12px;
      margin-right: 8px;

      fill: ${({ color }) => color};
    }
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    opacity: 0;

    ul {
      li {
        opacity: 0;
        color: ${({ theme }) => theme.colors.secondary};

        & + li {
          margin-top: 8px;
        }

        .Icon {
          width: 18px;
          height: 12px;
          margin-right: 8px;

          fill: ${({ theme }) => theme.colors.green};
        }
      }
    }

    button {
      width: 100%;
      min-height: 32px;
      height: 32px;
      border-radius: 10px;
      opacity: 0;

      color: ${({ theme }) => theme.colors.secondary};
      background-color: ${({ color }) => color};
    }

    #roleAlreadyExists {
      background-color: transparent;
      border: solid 1px ${({ color }) => color};
    }
  }
`
export default Style

Style.displayName = 'RoleInfo-Style'
