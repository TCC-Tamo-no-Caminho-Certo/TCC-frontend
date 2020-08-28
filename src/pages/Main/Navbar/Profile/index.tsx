import React, { useState } from 'react'
import Style, { AnimationShape } from './styles'

import avatar from 'assets/avatar.jpg'

import Anime from '@mollycule/react-anime'

const Profile: React.FC = () => {
  const totalWidth = document.getElementById('svg')?.clientWidth as number
  const totalHeight = document.getElementById('svg')?.clientHeight as number
  const offset = 5
  const cyTop = 50 + offset
  const cxRight = totalWidth - 65 + offset

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Style>
      <AnimationShape id='svg'>
        <Anime
          in={menuOpen}
          appear={false}
          duration={300}
          easing='linear'
          onEntering={{
            targets: 'path',
            fillOpacity: '1',
            d: `M${-totalHeight}, ${totalHeight / 2} a${totalWidth},${totalWidth} 0 1,1 ${
              totalWidth * 2
            },0a ${totalWidth},${totalWidth} 0 1,1 ${totalWidth * -2},0`,
          }}
          onExiting={{
            targets: 'path',
            fillOpacity: '0',
            d: `M${cxRight},${cyTop} a 0,0 0 1,1 0,0 a 0,0 0 1,1 0,0`,
          }}
        >
          <svg>
            <path fill='#80535D' d={`M${cxRight},${cyTop} a 0,0 0 1,1 0,0 a 0,0 0 1,1 0,0`} />
          </svg>
        </Anime>
      </AnimationShape>

      <button onClick={() => setMenuOpen(!menuOpen)} id='profile' type='button'>
        <img src={avatar} alt='profile' draggable='false' />
      </button>
    </Style>
  )
}

export default Profile
