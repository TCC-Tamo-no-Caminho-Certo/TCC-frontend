import styled from 'styled-components'

interface StyleProps {
  color: string
  title: string
}

export const Buttons = styled.div`
  width: 100%;

  button {
    width: 100%;
    height: 32px;
    margin-top: 8px;
    min-height: 32px;
    border-radius: 10px;
    font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);
  }

  #wantBe {
    background-color: ${({ color }) => color};
    box-shadow: 4px 4px 6px 1px rgba(0, 0, 0, 0.2);
    color: ${({ theme }) => theme.colors.secondary};
  }

  #alreadyAm {
    box-shadow: 4px 4px 6px 1px rgba(0, 0, 0, 0.2);
    background-color: transparent;
  }

  #deleteRole {
    box-shadow: 4px 4px 6px 1px rgba(0, 0, 0, 0.2);
    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.red};
  }
`

export const Title = styled.button`
  display: flex;
  align-items: center;

  cursor: pointer;
  user-select: none;
  margin-bottom: 8px;
  font-size: clamp(2rem, 0.6rem + 2.6vw, 2.2rem);

  .Icon {
    width: 18px;
    height: 12px;
    margin-right: 8px;

    fill: ${({ color }) => color};
  }
`

const Style = styled.div<StyleProps>`
  grid-area: ${({ title }) => title};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  width: 300px;
  margin-top: 24px;

  ul li {
    font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);

    color: ${({ theme }) => theme.colors.secondary};

    .Icon {
      width: 18px;
      height: 12px;
      margin-right: 8px;

      fill: ${({ theme }) => theme.colors.green};
    }
  }

  ${Title} {
    color: ${({ color }) => color};

    .Icon {
      fill: ${({ color }) => color};
    }
  }

  ${Buttons} {
    #wantBe {
      background-color: ${({ color }) => color};
      color: ${({ theme }) => theme.colors.secondary};
    }

    #alreadyAm {
      border: solid 1px ${({ color }) => color};
      color: ${({ color }) => color};
    }
  }
`

export default Style

Style.displayName = 'RoleInfo-Style'
