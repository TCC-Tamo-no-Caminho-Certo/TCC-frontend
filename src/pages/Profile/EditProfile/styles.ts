import styled from 'styled-components'

import fromTheme from 'utils/fromTheme'

const Card = styled.div.attrs({ className: 'Card' })`
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;

  width: 550px;
  height: 650px;
  border-radius: 16px;
  padding: 60px 20px 20px 20px;

  background-color: ${fromTheme('secondary')};
`

const Style = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100vh;

  background-color: ${fromTheme('tertiary')};

  ${Card} + ${Card} {
    margin-left: 60px;
  }
`

export const Personal = styled(Card)`
  > *,
  form .ContainerChange {
    margin-bottom: 24px;
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;

  width: 550px;
  height: 40px;
  border-radius: 16px 16px 0 0;

  background-color: ${fromTheme('primary')};
  color: ${fromTheme('white')};
`

export default Style
