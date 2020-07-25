import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

const Github: React.FC = () => {
  const theme = useContext(ThemeContext)

  return (
    <svg width='42' height='42' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g filter='url(#filter0_d)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M21 0C11.607 0 4 7.607 4 17c0 7.523 4.866 13.876 11.624 16.129.85.149 1.168-.361 1.168-.808 0-.403-.02-1.742-.02-3.166-4.272.786-5.377-1.041-5.717-1.998-.191-.488-1.02-1.997-1.742-2.4-.596-.32-1.446-1.106-.022-1.127 1.339-.021 2.295 1.233 2.614 1.742 1.53 2.572 3.974 1.85 4.951 1.403.149-1.105.595-1.849 1.084-2.274-3.783-.425-7.735-1.891-7.735-8.393 0-1.85.659-3.38 1.742-4.57-.17-.424-.764-2.167.17-4.504 0 0 1.424-.446 4.675 1.742a15.775 15.775 0 014.25-.573c1.445 0 2.89.19 4.25.573 3.252-2.21 4.675-1.742 4.675-1.742.936 2.337.34 4.08.17 4.505 1.084 1.19 1.743 2.699 1.743 4.569 0 6.523-3.974 7.968-7.756 8.393.616.531 1.147 1.551 1.147 3.145 0 2.274-.021 4.101-.021 4.675 0 .447.319.978 1.169.808C33.134 30.876 38 24.5 38 17c0-9.393-7.608-17-17-17z'
          fill={theme.githubIcon}
        />
      </g>
      <defs>
        <filter
          id='filter0_d'
          x='0'
          y='0'
          width='42'
          height='42'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          />
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='2' />
          <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
          <feBlend in2='BackgroundImageFix' result='effect1_dropShadow' />
          <feBlend in='SourceGraphic' in2='effect1_dropShadow' result='shape' />
        </filter>
      </defs>
    </svg>
  )
}

export default Github
