import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Seasons = styled.ul`
  padding: 24px 8px;
  border-radius: 0px 0px 16px 16px;

  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.4);
  color: ${({ theme }) => theme.colors.tertiary};
  background-color: ${({ theme }) => theme.colors.secondary};

  #noSeasons {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > * + * {
    margin-top: 24px;
  }

  @media screen and (min-width: 375px) {
    padding: 24px 12px;
  }

  @media screen and (min-width: 545px) {
    padding: 24px;
  }
`

const Style = styled(motion.li)`
  width: 100%;

  #universityName {
    position: relative;
    z-index: 3;

    width: 100%;
    height: 72px;
    font-size: clamp(1.8rem, 0.6rem + 2.6vw, 2.4rem);

    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.4);
    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};
    border: solid 1px ${({ theme }) => theme.colors.secondary};
  }

  @media screen and (min-width: 375px) {
    width: 90%;
  }

  @media screen and (min-width: 545px) {
    width: clamp(300px, 80vw, 600px);
  }
`

export default Style

Style.displayName = 'University-Style'
