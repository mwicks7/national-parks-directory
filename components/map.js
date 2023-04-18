import { GoogleMap, useJsApiLoader, MarkerClusterer,  Marker } from '@react-google-maps/api';
import React from 'react'

const containerStyle = {
  maxWidth: '100%',
  height: '500px',
  marginBottom: '20px'
};

const options = {
  // imagePath:
  //   'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
}

function Map({ center, markers=[], zoom=10 }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDWsJoBnD-v_WscQc0CSu4dzISfa7m3v1M"
  })

  const [map, setMap] = React.useState(null)

  // const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    // setMap(map)
  // }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad=""
        onUnmount={onUnmount}
      >
        {markers && 
          <MarkerClusterer options={options}>
            {(clusterer) =>
              markers.map((marker) => (
                <Marker 
                  key={marker.latitude} 
                  averageCenter={true}
                  cursor="pointer"
                  position={{lat: marker.lat, lng: marker.lng}}
                  clusterer={clusterer}  
                  label={marker.label} 
                  onClick={() => alert(marker.label)}
                />
              ))
            }
          </MarkerClusterer>

        }
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)
