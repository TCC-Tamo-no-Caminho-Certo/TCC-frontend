import React, { forwardRef } from 'react'
import Style from './styles'

const AboutProject = forwardRef((props, ref) => {
  return (
    <Style ref={ref as any}>
      <header>
        <div id='nameStatus'>
          <h1>Projeto legal</h1>

          <div id='status'>
            <div id='circle' />

            <span>Rascunho</span>
          </div>
        </div>

        <h2>Universidade Anhembi Morumbi (UAM)</h2>
      </header>

      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
        quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
        arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
        Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras
        dapibu
      </p>
    </Style>
  )
})

export default AboutProject
