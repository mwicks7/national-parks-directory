import Link from 'next/link'
import ParkCard from '../components/parkCard'
import Map from './map'

export default function SubPage({ parkCode, parkInfo, pageTitle, mapMarkers, children }) {
  return (
    <div className="park-page">
      <div className="park-page__content">
        <ParkCard
          park={parkInfo}
          listing={false}
          pageTitle={pageTitle}
        />

        {children}
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
