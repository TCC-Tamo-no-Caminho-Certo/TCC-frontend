import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

export const Style = styled.section`
  grid-area: signup;
  width: 100%;
  min-height: 100%;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 10px 10px 0;
  background-color: ${fromTheme('secondary')};
  position: relative;

  .InputText + .InputText {
    margin-top: 20px;
  }
`

export const Text = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 1.3rem;
  width: 400px;
  padding: 5px 0 10px 5px;
  color: ${fromTheme('tertiary')};
`

export const BackButton = styled.button`
  position: absolute;
  left: 30px;
  top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: ${fromTheme('primary')};

  span {
    font-family: 'Satisfy', cursive;
    line-height: 28px;
  }
`
