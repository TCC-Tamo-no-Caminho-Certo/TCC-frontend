import styled from 'styled-components'

export const NotLinked = styled.div`
  padding: 24px;
  text-align: center;
  border-radius: 8px;

  box-shadow: 3px 3px 4px 0px rgba(0, 0, 0, 0.49);
  background-color: ${({ theme }) => theme.colors.primary};
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  margin-top: 93px;

  > * + * {
    margin-top: 24px;
  }
`

const Style = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100vh;

  header {
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;

    padding: 24px;
    width: max(100%, 280px);
  }

  @media screen and (min-width: 545px) {
    header {
      padding: 32px;
    }
  }
`

export default Style

NotLinked.displayName = 'NotLinked-Style'
Content.displayName = 'Content-Style'
Style.displayName = 'Seasons-Style'
