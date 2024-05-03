import { useState } from "react"
import { Marker, InfoWindow, useMarkerRef } from "@vis.gl/react-google-maps"

const MapMarker = ({ parkMarker }) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false)
  const [markerRef, marker] = useMarkerRef()

  return (
    <>
      <Marker
        ref={markerRef}
        onClick={() => setInfowindowOpen(!infowindowOpen)}
        position={{ lat: parkMarker.lat, lng: parkMarker.lng }}
        // title={"AdvancedMarker that opens an Infowindow when clicked."}
      />
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}
        >
          {parkMarker.label}
        </InfoWindow>
      )}
    </>
  )
}

export default MapMarker
