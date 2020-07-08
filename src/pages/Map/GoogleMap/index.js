import React from "react"
import Style from "./styles"
import {GoogleApiWrapper} from "google-maps-react"

function GoogleMap() {
  return (
    <Style
      google={props.google}
      zoom={14}
      style={mapStyles}
      initialCenter={{
        lat: -1.2884,
        lng: 36.8233,
      }}
    />
  )
}

export default GoogleApiWrapper({
  apiKey: "YOUR_GOOGLE_API_KEY_GOES_HERE",
})(GoogleMap)
