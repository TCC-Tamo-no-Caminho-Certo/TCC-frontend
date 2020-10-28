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
    height: 600px;
    width: 550px;
    border-radius: 20px;

    position: sticky;
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

export const InfoChanger = styled.div.attrs({ className: 'InfoChanger' })`
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

const Style = styled(motion.section)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100vh;
  position: relative;
  background-color: ${fromTheme('tertiary')};

  h2 {
    position: absolute;
    top: 5%;

    color: white;
    font-size: 3rem;
  }

  .Card + .Card {
    margin-left: 60px;
  }

  #saveButton {
    position: absolute;
    right: 10%;
    bottom: 8%;

    width: 200px;
    height: 40px;
    border-radius: 15px;

    color: #eee;
    background-color: #ff6d8d;
    box-shadow: 2px 3px 5px 0px rgba(0, 0, 0, 0.49);
    transition: transform 1s ease;

    &:hover {
      transform: scale(1.03);
    }
  }

  #discardButton {
    position: absolute;
    right: 10%;
    bottom: 8%;

    height: 40px;
    border-radius: 15px;
    margin-right: 220px;

    color: #eee;
    background-color: transparent;

    &:hover {
      color: #ff6d8d;
    }
  }
`

export default Style

Style.displayName = 'Slider-Style'
Label.displayName = 'Label-Style'
Value.displayName = 'Value-Style'
Change.displayName = 'Change-Style'
InfoChanger.displayName = 'Infos-Style'
