import styled from 'styled-components'

import fromTheme from 'utils/fromTheme'

const Style = styled.div`
  background-color: ${fromTheme('secondary')};
  color: ${fromTheme('tertiary')};

  form {
    display: flex;
    align-items: center;
    flex-direction: column;

    margin-top: 100px;
  }

  .ContainerChange {
    margin-top: 20px;
  }
`

export const Cover = styled.div`
  position: relative;

  width: 100%;
  height: 210px;
  margin-bottom: 85px;

  background-color: ${fromTheme('tertiary')};

  img {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
  }
`

export default Style
