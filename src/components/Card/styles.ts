import styled from 'styled-components'

const Style = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 60px 20px;
  border-radius: 16px;

  background-color: white;
  box-shadow: 8px 8px 5px 0px rgba(0, 0, 0, 0.49);

  .Field + .Field {
    margin-top: 24px;
  }

  .Avatar {
    margin-bottom: 24px;
  }
`

export const Header = styled.header`
  position: absolute;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 40px;
  border-radius: 16px 16px 0 0;

  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
`

export default Style

Style.displayName = 'Card-Style'
Header.displayName = 'Header-Style'
