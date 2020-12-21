import styled from 'styled-components'

import Card, { Header as HeaderComponent } from 'components/Card/styles'

import { Form as FormComponent, Input as InputComponent } from 'components/Form'

export const Style = styled(Card)`
  height: min(400px, 50%);
  max-width: min(550px, 35%);

  section {
    height: 100%;
    width: 80%;

    span {
      margin-top: 5%;
      display: inline-block;
      font-size: 2.4rem;
      color: #00d053;
    }

    .form-role-description {
      text-align: center;
      margin-top: 10px;
      margin-bottom: -10px;
      font-size: 1.6rem;
      color: #6e4850;
    }

    p {
      width: 100%;
      margin-top: 5%;
      font-size: 18px;
      color: #6e4850;
    }

    p.form-role-text {
      margin: 3%;
      text-align: center;
    }
  }
`

export const Header = styled(HeaderComponent)`
  font-size: 24px;
  padding: 30px 50px;

  justify-content: start;
`
export const Form = styled(FormComponent)`
  width: 100%;
  height: 100%;

  & > button {
    width: 100%;
    height: 20%;

    transition: all 0.2s;
    font: 500 1.8rem 'Archivo';
    font-size: calc(1.3rem + 0.5vh);

    color: white;
    border: none;
    margin-top: 20px;
    border-radius: 8px;
    background-color: #d65881;

    &:hover {
      filter: brightness(1.1);
      transform: scale(1.01);
    }

    position: relative;

    .DotsLoader {
      position: absolute;
      right: 10%;
      top: 50%;

      transform: translateY(-50%);
    }
  }
`
export const Input = styled(InputComponent)`
  margin-top: 5%;
  border-radius: 150px;

  font-size: 16px;
`
