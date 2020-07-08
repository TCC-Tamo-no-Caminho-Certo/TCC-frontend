import React from "react"
import Style from "./styles"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import About from "./About"
import useRegister from "store/useRegister"
import {Helmet} from "react-helmet"

export default function Home() {
  const {register} = useRegister()

  return (
    <Style register={register}>
      <Helmet>
        <title>Steam Lab</title>
        <meta name="robots" content="index, nofollow" />
        <meta
          name="description"
          content="Steam Lab, conectando alunos a empresas"
        />
        <meta name="author" content="Aris Lab" />
        <meta name="keywords" content="emprego, estágio, desenvolvedor" />
      </Helmet>
      <SignIn />
      <SignUp />
      <About />
    </Style>
  )
}
