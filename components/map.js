import { GoogleMap, useJsApiLoader, MarkerClusterer,  Marker } from '@react-google-maps/api';
import React from 'react'

const containerStyle = {
  maxWidth: '100%',
  height: '500px',
  marginBottom: '20px'
};

const options = {
  // imagePath:
  //   '/images/tooltip.png', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
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

  const onHover = React.useCallback(() => {
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      ariaLabel: "Uluru",
    });
  }, [])

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
                  label={marker.label.substring(0, 21)} 
                  icon={{
                    url: '/images/map_tooltip.png',
                    scaledSize: new google.maps.Size(160, 45)
                  }}
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
