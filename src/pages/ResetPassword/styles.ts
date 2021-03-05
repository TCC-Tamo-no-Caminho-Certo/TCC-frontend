import styled from 'styled-components'

export const Content = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: min(90%, 500px);
  padding: 16px;
  border-radius: 10px;

  box-shadow: -8px 8px 10px -4px rgba(0, 0, 0, 0.49);
  background: ${({ theme }) => theme.colors.secondary};

  p {
    text-align: center;
    margin: 0;
  }

  form {
    width: 100%;

    p,
    .Submit {
      margin-top: 16px;
    }

    .Text {
      margin-top: 8px;
    }

    .Submit {
      width: 100%;
      height: 44px;
      transition: all 0.2s;

      &:hover {
        transform: scale(1.01);

        filter: brightness(1.1);
      }
    }
  }
`

const Style = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.tertiary};
`

export default Style

Content.displayName = 'Content-Style'
Style.displayName = 'ResetPassword-Style'
