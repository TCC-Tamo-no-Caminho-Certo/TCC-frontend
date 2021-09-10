import { motion } from 'framer-motion'
import styled from 'styled-components'

export const UniversityName = styled(motion.button).attrs({ type: 'button' })`
  position: relative;
  z-index: 3;

  width: 100%;
  height: 72px;
  padding: 0 16px;
  font-size: clamp(1.8rem, 0.6rem + 2.6vw, 2.4rem);

  box-shadow: ${({ theme }) => theme.shadow.normal};
  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.primary};
  border: solid 1px ${({ theme }) => theme.colors.secondary};
`

export const Seasons = styled.div`
  > * + * {
    margin-top: 24px;
  }
`

const Style = styled.div`
  width: 90%;

  .AnimatedList {
    border-radius: 0px 0px 16px 16px;

    box-shadow: ${({ theme }) => theme.shadow.normal};
    color: ${({ theme }) => theme.colors.tertiary};
    background-color: ${({ theme }) => theme.colors.secondary};

    #noSeasons {
      display: flex;
      align-items: center;
      justify-content: center;

      padding: 16px;
      text-align: center;
    }
  }

  @media screen and (min-width: 545px) {
    width: clamp(300px, 80%, 600px);
  }
`

export default Style

UniversityName.displayName = 'UniversityName-Style'
Seasons.displayName = 'Seasons-Style'
Style.displayName = 'University-Style'
