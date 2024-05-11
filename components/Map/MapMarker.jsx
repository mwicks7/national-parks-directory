import { useState, useEffect } from "react"
import { Marker, InfoWindow, useMarkerRef } from "@vis.gl/react-google-maps"

const MapMarker = ({ parkMarker, openMarker }) => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false)
  const [markerRef, marker] = useMarkerRef()

  useEffect(() => {
    setInfoWindowOpen(openMarker)
  }, [openMarker])

  return (
    <>
      <Marker
        ref={markerRef}
        onClick={() => setInfoWindowOpen(!infoWindowOpen)}
        position={{ lat: parkMarker.lat, lng: parkMarker.lng }}
      />
      {infoWindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfoWindowOpen(false)}
        >
          {parkMarker.label}
        </InfoWindow>
      )}
    </>
  )
}

export default MapMarker
