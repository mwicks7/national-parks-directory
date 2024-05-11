import { APIProvider, Map as GMap } from "@vis.gl/react-google-maps"
import MapMarker from "./MapMarker"

const Map = ({
  center,
  markers = [],
  openMarker,
  setOpenMarker,
  zoom = 10,
}) => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GMAPS_API_KEY}>
      <GMap
        style={{ width: "100%", height: "100%" }}
        defaultCenter={center}
        defaultZoom={zoom}
        gestureHandling={"greedy"}
      >
        {markers.map((marker) => (
          <MapMarker
            parkMarker={marker}
            key={marker.id}
            isOpen={marker.id === openMarker}
            setOpenMarker={setOpenMarker}
          />
        ))}
      </GMap>
    </APIProvider>
  )
}

export default Map
