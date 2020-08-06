import styled from 'styled-components'
import fromTheme from 'utils/fromTheme'

const Style = styled.section`
  grid-area: signup;
  min-width: 320px;
  width: 100%;
  min-height: 100vh;
  padding: 30px;
  position: relative;
  background-color: ${fromTheme('secondary')};

  &,
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .InputText + .InputText,
  .InputDate + .InputText {
    margin-top: 20px;
  }

  .Logo {
    margin: 50px 0 30px 0;
  }

  hr,
  .Button,
  .InputText,
  .InputDate,
  .InfoText {
    min-width: 300px;
    width: 80vw;
    max-width: 400px;
  }

  @media screen and (min-width: 1200px) {
    border-radius: 0 15px 15px 0;
  }
`

export const DualInput = styled.div`
  div:first-child {
    border-bottom: none;
    border-radius: 10px 10px 0 0;
  }

  hr {
    border: none;
    border-top: solid 1px ${fromTheme('tertiary')};
  }

  hr + div {
    border-top: none;
    margin-top: 0px;
    border-radius: 0 0 10px 10px;
  }
`

export const InfoText = styled.div.attrs({
  className: 'InfoText',
})`
  font-size: 1.3rem;
  width: 80vw;
  max-width: 400px;
  display: flex;
  align-items: center;
  text-align: left;
  padding: 5px 0 10px 5px;
  color: ${fromTheme('tertiary')};
`

export const BackButton = styled.button`
  padding: 5px;
  position: absolute;
  left: 30px;
  top: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: ${fromTheme('primary')};

  span {
    line-height: 28px;
  }
`

export default Style
