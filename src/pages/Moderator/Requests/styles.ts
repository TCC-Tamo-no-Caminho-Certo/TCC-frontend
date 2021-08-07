import { getStatusColor, StatusTypes } from 'utils/status'

import Form from 'components/Form'

import { motion } from 'framer-motion'
import styled from 'styled-components'

interface CircleProps {
  status?: StatusTypes
}

export const Filter = styled(Form)`
  width: 100%;
  padding: 16px;

  caret-color: ${({ theme }) => theme.colors.secondary};

  > * + * {
    margin-top: 16px;
  }

  .row {
    display: flex;
    flex-direction: column;

    > * {
      width: 100%;

      + * {
        margin-top: 16px;
      }
    }
  }

  @media screen and (min-width: 545px) {
    .row {
      flex-direction: row;

      > * + * {
        margin-left: 24px;
        margin-top: 0px;
      }
    }
  }
`

export const FilterButton = styled(motion.button).attrs({ type: 'button' })`
  display: flex;
  flex-direction: row;

  width: 100%;

  .Submit {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 40px;

    border-radius: 16px 0 0 16px;

    color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.23);
    background-color: ${({ theme }) => theme.colors.primary};

    .Icon {
      height: 16px;
      margin-right: 12px;

      fill: ${({ theme }) => theme.colors.secondary};
    }

    & + button {
      align-self: flex-end;

      height: 40px;
      width: 200px;
      padding: 4px 16px;
      transition: all 0.2s;
      border-radius: 0 16px 16px 0;
      font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.8rem);

      box-shadow: 0px 8px 5px 0px rgba(0, 0, 0, 0.23);
      color: ${({ theme }) => theme.colors.primary};
      background-color: ${({ theme }) => theme.colors.secondary};

      &:hover {
        transform: scale(1.01);

        filter: brightness(1.1);
      }
    }
  }
`

export const Circle = styled.div<CircleProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 8px;
  height: 8px;
  border-radius: 50%;

  background-color: ${({ theme, status }) => getStatusColor(theme, status)};
`

const Style = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  height: 100vh;
  overflow-y: hidden;

  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.tertiary};

  header {
    display: flex;
    text-align: left;
    align-items: center;

    width: max(100%, 280px);
    padding: 16px 16px 0px 8px;
    margin-bottom: 24px;
  }

  .Table #name {
    width: 80%;
  }

  @media screen and (min-width: 545px) {
    header {
      padding: 16px 16px 0px 24px;
    }
  }
`

export default Style

Circle.displayName = 'Circle-Style'
Style.displayName = 'Requests-Style'
