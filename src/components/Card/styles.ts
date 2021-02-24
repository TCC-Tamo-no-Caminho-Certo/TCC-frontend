import styled from 'styled-components'

export const Header = styled.header`
  position: absolute;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 40px;
  border-radius: 16px 16px 0 0;

  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.primary};
`

const Style = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 64px 24px;
  width: 520px;
  margin: 0 24px;
  border-radius: 16px;

  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 8px 8px 4px 0px rgba(0, 0, 0, 0.49);

  .Field + .Field {
    margin-top: 24px;
  }

  .Avatar {
    margin-bottom: 24px;
  }
`

export default Style

Header.displayName = 'Header-Style'
Style.displayName = 'Card-Style'
