import styled from 'styled-components'

import fromTheme from 'utils/fromTheme'

const Style = styled.div`
  height: 100vh;

  background-color: ${fromTheme('tertiary')};
  color: ${fromTheme('tertiary')};

  .Slider {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    height: 700px;
    width: 100%;

    overflow: visible !important;
  }
`

const Card = styled.div`
  display: flex !important;
  align-items: center !important;
  flex-direction: column;

  width: 550px !important;
  height: 650px;
  border-radius: 16px;
  margin-left: 50%;
  transform: translateX(-50%);

  background-color: ${fromTheme('secondary')};
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

  width: 100%;
  height: 40px;
  border-radius: 16px 16px 0 0;

  background-color: ${fromTheme('primary')};
  color: ${fromTheme('white')};
`

export default Style
