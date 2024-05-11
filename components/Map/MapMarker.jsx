import { useState, useEffect } from "react"
import { Marker, InfoWindow, useMarkerRef } from "@vis.gl/react-google-maps"

const MapMarker = ({ parkMarker, isOpen, setOpenMarker }) => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false)
  const [markerRef, marker] = useMarkerRef()

  useEffect(() => {
    setInfoWindowOpen(isOpen)
  }, [isOpen])

  const handleClick = () => {
    setOpenMarker(!isOpen ? parkMarker.id : "")
    location.replace(`#${parkMarker.id}`)
  }

  return (
    <>
      <Marker
        ref={markerRef}
        onClick={handleClick}
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
