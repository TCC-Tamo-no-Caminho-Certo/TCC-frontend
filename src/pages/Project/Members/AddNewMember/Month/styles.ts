import { motion } from 'framer-motion'
import { darken } from 'polished'
import styled, { css } from 'styled-components'

interface StyleProps {
  showTask: boolean
  showBorder: boolean
}

const Style = styled(motion.div)<StyleProps>`
  cursor: pointer;
  border-radius: 16px;
  font-size: clamp(1rem, 0.6rem + 2.6vw, 1.6rem);

  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.39);
  background-color: ${({ theme }) => theme.colors.tertiary};

  & + .month {
    margin-top: 24px;
  }

  .title {
    position: relative;
    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    font-size: clamp(1.2rem, 0.6rem + 2.6vw, 1.8rem);
    border-radius: ${({ showTask }) => (showTask ? '16px 16px 0 0' : '16px')};

    background-color: ${({ theme }) => darken(0.17, theme.colors.tertiary)};

    button {
      width: 50%;
      padding: 16px;
      font-size: clamp(1.2rem, 0.6rem + 2.6vw, 1.8rem);
    }

    #ArrowIcon {
      height: 12px;
      margin-right: 8px;

      fill: ${({ theme }) => theme.colors.secondary};
    }

    #InterrogationIcon {
      position: absolute;
      right: 24px;
      top: 16px;

      width: 24px;
      height: 24px;

      fill: ${({ theme }) => theme.colors.secondary};
    }

    #text {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 50%;

      .Text {
        min-width: 40%;
        margin-left: 4px;

        input {
          padding-left: 4px;
        }
      }
    }
  }

  #textareaField {
    padding: ${({ showTask }) => (showTask ? '16px' : '0px')};

    .Textarea {
      position: relative;
      z-index: ${({ showTask }) => (showTask ? 3 : -1)};
    }
  }

  .Textarea {
    background-color: transparent;
  }

  .Text,
  .Textarea {
    ${({ showBorder }) =>
      showBorder
        ? css`
            border-style: dashed;
          `
        : css`
            border: none;
          `}
  }
`

export default Style
