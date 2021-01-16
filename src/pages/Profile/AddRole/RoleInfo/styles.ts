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

    font-size: 2.8rem;
    margin-bottom: 16px;
    -webkit-user-select: none;
    cursor: pointer;

    color: ${({ color }) => color};

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
        font-size: 1.6rem;

        color: ${({ theme }) => theme.colors.secondary};

        .Icon {
          width: 18px;
          height: 12px;
          margin-right: 8px;

          fill: ${({ theme }) => theme.colors.green};
        }
      }

      li + li {
        margin-top: 8px;
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
