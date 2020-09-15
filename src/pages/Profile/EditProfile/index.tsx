import React from 'react'
import Style, { Personal, Header } from './styles'

import LeftMenuPage from 'components/LeftMenuPage'
import ulData from '../ulData'

import ContainerChange from 'components/ContainerChange'

import avatar from 'assets/avatarEditProfile.png'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const EditProfile: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 400,
    className: 'Slider',
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1670,

        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 2080,

        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  }

  return (
    <LeftMenuPage ulData={ulData} selected='editProfile'>
      <Style>
        <Slider {...settings}>
          <Personal>
            <Header>Informações Pessoais</Header>

            <img src={avatar} alt='avatar' />

            <form>
              <ContainerChange label='Nome:' value='Miguel' />
              <ContainerChange label='Sobrenome:' value='Andrade' />
              <ContainerChange label='E-mail:' value='miguelandradebarreto2@gmail.com' />
              <ContainerChange label='Nascimento:' value='19/08/2001' />
              <ContainerChange label='Senha:' value='**********' />
            </form>
          </Personal>

          <Personal>
            <Header>Informações Pessoais</Header>

            <img src={avatar} alt='avatar' />

            <form>
              <ContainerChange label='Nome:' value='Miguel' />
              <ContainerChange label='Sobrenome:' value='Andrade' />
              <ContainerChange label='E-mail:' value='miguelandradebarreto2@gmail.com' />
              <ContainerChange label='Nascimento:' value='19/08/2001' />
              <ContainerChange label='Senha:' value='**********' />
            </form>
          </Personal>

          <Personal>
            <Header>Informações Pessoais</Header>

            <img src={avatar} alt='avatar' />

            <form>
              <ContainerChange label='Nome:' value='Miguel' />
              <ContainerChange label='Sobrenome:' value='Andrade' />
              <ContainerChange label='E-mail:' value='miguelandradebarreto2@gmail.com' />
              <ContainerChange label='Nascimento:' value='19/08/2001' />
              <ContainerChange label='Senha:' value='**********' />
            </form>
          </Personal>
        </Slider>
      </Style>
    </LeftMenuPage>
  )
}

export default EditProfile
