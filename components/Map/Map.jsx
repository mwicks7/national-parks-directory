import { APIProvider, Map as GMap } from "@vis.gl/react-google-maps"
import MapMarker from "./MapMarker"

const Map = ({ center, markers = [], zoom = 9 }) => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GMAPS_API_KEY}>
      <GMap
        style={{ width: "100%", height: "100%" }}
        defaultCenter={center}
        defaultZoom={zoom}
        gestureHandling={"greedy"}
      >
        {markers.map((marker) => (
          <MapMarker parkMarker={marker} key={marker.lat} />
        ))}
      </GMap>
    </APIProvider>
  )
}

export default Map
