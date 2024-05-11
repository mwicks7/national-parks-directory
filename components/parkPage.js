import { useState } from "react"
import Layout from "./layout"
import ParkHeader from "./parkHeader"
import MediaCard from "./mediaCard"
import Map from "./Map/Map"

export default function ParkPage({
  parkInfo,
  pageTitle,
  data,
  mapMarkerOverride,
  children,
}) {
  const [openMarker, setOpenMarker] = useState()

  const mapMarkers =
    mapMarkerOverride ||
    data
      .filter((node) => node.latitude && node.longitude)
      .map((node) => {
        return {
          id: node.id,
          label: node.name || node.title,
          lat: Number(node.latitude),
          lng: Number(node.longitude),
        }
      })

  return (
    <Layout>
      <div className="park-page">
        <div className="park-page__content">
          <ParkHeader park={parkInfo} pageTitle={pageTitle} />
          <div className="park-page__main">
            {children}

            <ul className="park-page__cards">
              {data &&
                (data.length > 0 ? (
                  data.map((node, i) => (
                    <li className="park-page__card">
                      <MediaCard
                        id={node.id}
                        onMouseEnter={() => setOpenMarker(node.id)}
                        key={node.id}
                        img={
                          node.images?.[0]?.url && {
                            url: `${node.images[0].url}?quality=75&width=600`,
                            altText: node.images[0].altText,
                            loading: i <= 1 ? "eager" : "lazy",
                          }
                        }
                        title={node.name || node.title}
                        subtitle=""
                        description={
                          node.description ||
                          node.shortDescription ||
                          node.listingDescription
                        }
                        links={[
                          { href: node.url, text: "Read more at nps.gov" },
                        ]}
                      />
                    </li>
                  ))
                ) : (
                  <p className="no-results">No results.</p>
                ))}
            </ul>
          </div>
        </div>

        <div className="park-page__map">
          <Map
            center={{
              lat: Number(parkInfo.latitude),
              lng: Number(parkInfo.longitude),
            }}
            markers={mapMarkers}
            openMarker={openMarker}
            setOpenMarker={setOpenMarker}
          />
        </div>
      </div>
    </Layout>
  )
}
