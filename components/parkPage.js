import Link from 'next/link'
import ParkHeader from './parkHeader'
import Map from './map'

export default function ParkPage({ parkCode, parkInfo, pageTitle, mapMarkers, children }) {
  return (
    <div className="park-page">
      <div className="park-page__content">
        <ParkHeader
          park={parkInfo}
          pageTitle={pageTitle}
        />
        <div className="park-page__main">
          {children}
        </div>
      </div>

      <div className="park-page__map">
        <Map
          center={{
            lat: Number(parkInfo.latitude),
            lng: Number(parkInfo.longitude)
          }}
          markers={mapMarkers}
        />
      </div>
    </div>
  )
}
