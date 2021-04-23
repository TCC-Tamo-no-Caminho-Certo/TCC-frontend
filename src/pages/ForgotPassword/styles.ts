import styled from 'styled-components'

const Style = styled.section`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.tertiary};

  .BackButton {
    position: absolute;
    top: 24px;
    left: 32px;

    transition: all 0.2s;

    color: ${({ theme }) => theme.colors.secondary};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`

export default Style

Style.displayName = 'ForgotPassword-Style'
