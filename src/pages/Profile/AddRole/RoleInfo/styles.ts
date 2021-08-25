import styled from 'styled-components'

interface StyleProps {
  color: string
  title: string
}

const Style = styled.div<StyleProps>`
  grid-area: ${({ title }) => title};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  width: 300px;
  margin-top: 24px;

  .title {
    display: flex;
    align-items: center;

    cursor: pointer;
    margin-bottom: 16px;
    user-select: none;
    font-size: clamp(2rem, 0.6rem + 2.6vw, 2.2rem);

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

    ul li {
      font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);

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

    button {
      width: 100%;
      height: 32px;
      margin-top: 24px;
      min-height: 32px;
      border-radius: 10px;
      font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);

      opacity: 0;
      color: ${({ theme }) => theme.colors.secondary};
      background-color: ${({ color }) => color};
    }

    #roleAlreadyExists {
      background-color: transparent;
      border: solid 1px ${({ color }) => color};
    }

    #deleteRole {
      margin-top: 16px;

      background-color: ${({ theme }) => theme.colors.red};
    }
  }
`

export default Style

Style.displayName = 'RoleInfo-Style'
