import React from "react"
import Style from "./styles"
import {useHistory} from "react-router-dom"
import {ButtonPrimary} from "components/Form/Button"
import {Helmet} from "react-helmet"

export default function Map() {
  let history = useHistory()
  return (
    <Style>
      <Helmet>
        <title>Steam Map</title>
      </Helmet>
      <ButtonPrimary onClick={() => history.push("/")}>Sair</ButtonPrimary>
    </Style>
  )
}
