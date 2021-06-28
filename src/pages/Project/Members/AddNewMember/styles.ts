import { motion } from 'framer-motion'
import { darken } from 'polished'
import styled, { css } from 'styled-components'

interface StyleProps {
  showBorder: boolean
}

const Style = styled(motion.div)<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 250px;
  padding: 24px;
  margin-top: 24px;
  border-radius: 8px;

  color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.39);
  background-color: ${({ theme }) => darken(0.1, theme.colors.tertiary)};

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    color: ${({ theme }) => theme.colors.secondary};

    span {
      text-align: center;
    }

    .Icon {
      overflow: visible;
      margin-right: 8px;
    }
  }

  #body {
    width: 100%;

    .Select {
      margin-bottom: 24px;
    }

    .month {
      padding: 16px;
      border-radius: 8px;
      padding: 16px;
      cursor: pointer;

      box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.39);
      background-color: ${({ theme }) => theme.colors.tertiary};

      & + .month {
        margin-top: 24px;
      }

      .title {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .Text {
          margin-left: 4px;

          input {
            padding-left: 4px;
          }
        }
      }

      .Textarea {
        background-color: transparent;
      }

      .Text,
      .Textarea {
        border-radius: 0px;

        ${({ showBorder }) =>
          showBorder
            ? css`
                border-style: dashed;
              `
            : css`
                border: none;
              `}
      }
    }
  }
`

export default Style
