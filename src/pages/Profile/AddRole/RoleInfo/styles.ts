import styled from 'styled-components'

interface StyleProps {
  color: string
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

  .title {
    display: flex;
    align-items: center;

    margin-bottom: 16px;
    -webkit-user-select: none;
    cursor: pointer;

    color: ${({ color }) => color};
    font-size: clamp(2rem, 0.6rem + 2.6vw, 2.2rem);

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
      opacity: 0;
      color: ${({ theme }) => theme.colors.secondary};
      font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);

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
      margin-top: 24px;

      width: 100%;
      min-height: 32px;
      height: 32px;
      border-radius: 10px;
      opacity: 0;

      font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);
      color: ${({ theme }) => theme.colors.secondary};
      background-color: ${({ color }) => color};
    }

    #roleAlreadyExists {
      background-color: transparent;
      border: solid 1px ${({ color }) => color};
    }

    #deleteRole {
      background-color: ${({ theme }) => theme.colors.red};
      margin-top: 16px;
    }
  }
`
export default Style

Style.displayName = 'RoleInfo-Style'
