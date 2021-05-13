import { motion } from 'framer-motion'
import styled from 'styled-components'

export const ConfirmForm = styled.div`
  position: relative;
  padding: 24px;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  border-radius: 16px;
  width: clamp(320px, 90vw, 500px);

  background-color: ${({ theme }) => theme.colors.secondary};

  span {
    display: block;

    text-align: center;
  }

  .Text {
    width: 100%;
    margin: 16px 0;
  }

  #buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 100%;
    height: 44px;

    #cancel {
      margin-right: 16px;

      color: ${({ theme }) => theme.colors.tertiary};

      &:hover {
        transform: scale(1.01);
        filter: brightness(1.1);

        color: ${({ theme }) => theme.colors.primary};
      }
    }

    .Submit {
      height: 40px;
      width: 200px;

      .DotsLoader {
        right: 16px;
      }
    }
  }
`

const Style = styled(motion.section)`
  position: relative;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;

  background-color: ${({ theme }) => theme.colors.tertiary};

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    width: 100%;
    height: 100%;
  }

  .Card + .Card {
    margin-left: 60px;
  }

  .Slider {
    margin: 32px 0;
  }

  #submits {
    display: flex;
    align-items: center;
    justify-content: center;

    padding-bottom: 24px;

    button {
      height: 40px;
      border-radius: 15px;
      font-size: clamp(1.6rem, 0.6rem + 2.6vw, 1.8rem);
      line-height: clamp(1.6rem, 0.6rem + 2.6vw, 1.8rem);

      background-color: transparent;
      color: ${({ theme }) => theme.colors.secondary};

      & + button {
        height: 40px;
        margin-left: 16px;
        border-radius: 15px;
        transition: transform 1s ease;
        width: clamp(120px, 20vw, 200px);

        box-shadow: 2px 3px 5px 0px rgba(0, 0, 0, 0.49);
        color: ${({ theme }) => theme.colors.secondary};
        background-color: ${({ theme }) => theme.colors.primary};

        &:hover {
          transform: scale(1.03);
        }
      }
    }
  }

  @media screen and (min-width: 545px) and (min-height: 800px) {
    justify-content: center;

    #submits {
      position: absolute;
      right: 50%;
      bottom: 24px;

      transform: translateX(50%);
    }
  }

  @media screen and (min-width: 1500px) {
    #submits {
      right: 64px;

      transform: translateX(0%);
    }
  }
`

export default Style

ConfirmForm.displayName = 'ConfirmForm-Style'
Style.displayName = 'EditProfile-Style'
