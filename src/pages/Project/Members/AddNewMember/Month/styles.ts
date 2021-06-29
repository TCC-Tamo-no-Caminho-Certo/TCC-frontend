import { motion } from 'framer-motion'
import styled, { css } from 'styled-components'

interface StyleProps {
  showTask: boolean
  showBorder: boolean
}

const Style = styled(motion.div)<StyleProps>`
  cursor: pointer;
  border-radius: 8px;

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

    button {
      width: 50%;
      padding: 16px;
    }

    #ArrowIcon {
      height: 12px;
      margin-right: 8px;

      fill: ${({ theme }) => theme.colors.secondary};
    }

    #InterrogationIcon {
      position: absolute;
      top: 16px;
      right: 24px;

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
