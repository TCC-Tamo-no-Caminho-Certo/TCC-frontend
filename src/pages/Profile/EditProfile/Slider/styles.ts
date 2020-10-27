import { animated } from 'react-spring'
import styled from 'styled-components'

interface StyleProps {
  cardwidth: string
  gap: string
}

export const Animation = styled(animated.div)``

const Style = styled(animated.div)<StyleProps>`
  flex-direction: column;

  &,
  .sliderWrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 64px;
  }

  ${Animation} {
    height: 100%;
    width: ${({ cardwidth }) => cardwidth};
  }

  ${Animation} + ${Animation} {
    margin-left: ${({ gap }) => gap};
  }

  div > img {
    margin-bottom: 24px;
  }

  > *,
  form .ChangeSetter {
    margin-bottom: 24px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  form > button {
    position: absolute;
    right: 10%;
    bottom: 10%;
    width: 200px;
    height: 40px;
    border-radius: 15px;

    color: #eee;
    background-color: #ff6d8d;
  }
`

export const Content = styled.div.attrs({ className: 'ChangeSetter' })`
  display: grid;
  grid: 'labels value change' 100%/15% 70% 15%;

  font-size: 1.5rem;
  height: 40px;
  width: 500px;
  border-radius: 5px;

  border: solid 2px #50393e;
  color: #50393e;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const Label = styled.div`
  grid-area: labels;
  justify-self: start;

  & > label {
    padding-left: 15px;
  }
`

export const Value = styled.div`
  grid-area: value;

  span {
    cursor: pointer;
  }

  div,
  input,
  span {
    min-width: 100%;
    padding: 0;

    font-size: inherit;
    font-family: inherit;
    text-align: center;
    overflow-wrap: break-word;

    color: inherit;
  }
`

export const Change = styled.div`
  grid-area: change;
  justify-self: end;

  & > label {
    padding-right: 15px;
  }

  & > img {
    cursor: pointer;
  }
`

export const ConfirmModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;

  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.75);

  & > div {
    height: 60%;
    width: 45%;
    border-radius: 20px;
  }
`

export default Style

Animation.displayName = 'Animation-Style'
Style.displayName = 'Slider-Style'
Label.displayName = 'Label-Style'
Value.displayName = 'Value-Style'
Change.displayName = 'Change-Style'
Content.displayName = 'Infos-Style'
