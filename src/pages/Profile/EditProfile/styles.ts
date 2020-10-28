import fromTheme from 'utils/fromTheme'

import { motion } from 'framer-motion'
import styled from 'styled-components'

export const ConfirmModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 3;

  height: 100%;
  width: 100%;

  background-color: rgba(0, 0, 0, 0.75);

  & > div {
    height: 35%;
    width: 25%;
    padding: 0;
    border-radius: 20px;
    justify-content: center;

    > div {
      width: 75%;
    }

    button {
      background-color: ${fromTheme('primary')};
      color: ${fromTheme('white')};
      border-radius: 10px;
      width: 40%;
      height: 100%;
    }

    > .buttons {
      height: 10%;
      width: 80%;
      display: flex;
      justify-content: space-around;
      margin-top: 10%;

      & + button {
        margin-right: 20px;
      }
    }
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

  & > div,
  input,
  & > span {
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

export const InfoChanger = styled.div.attrs({ className: 'InfoChanger' })`
  display: grid;
  grid: 'labels value change' 100%/15% 70% 15%;

  font-size: 1.5rem;
  height: 40px;
  width: 500px;
  border-radius: 5px;

  border: solid 2px #50393e;
  color: #50393e;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Style = styled(motion.section)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100vh;
  position: relative;
  background-color: ${fromTheme('tertiary')};

  .Card + .Card {
    margin-left: 60px;
  }

  #saveButton {
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

export default Style

Style.displayName = 'Slider-Style'
Label.displayName = 'Label-Style'
Value.displayName = 'Value-Style'
Change.displayName = 'Change-Style'
InfoChanger.displayName = 'Infos-Style'
