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
`

export const FilterButton = styled(motion.button).attrs({ type: 'button' })``

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

  .Table {
    #name {
      width: 80%;
    }
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
