import { getParkPaths, getParkInfo, getParkData } from '../../lib/dbParks'
import Layout from '../../components/layout'
import SubPage from '../../components/subPage'
import MediaCard from '../../components/mediaCard'
import Map from '../../components/map'

export async function getStaticPaths() {
  const paths = await getParkPaths()
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const parkInfo = await getParkInfo(params.id)
  const parkData = await getParkData('campgrounds', params.id)

  return { 
    props: { 
      parkCode: params.id,
      parkInfo: parkInfo,
      data: parkData.data,
    } 
  }
}

export default function Campgrounds({ parkCode, parkInfo, data }) {  
  const markers = data.map(loc => {
    return {
      label: loc.name,
      lat: Number(loc.latitude),
      lng: Number(loc.longitude)
    }
  })

  return (
    <Layout>
      <SubPage pageTitle='Campgrounds' parkInfo={parkInfo} parkCode={parkCode}>
        <section>
          <div className="grid">
            <div className="grid__item">
              <Map 
                center={{
                  lat: Number(parkInfo.latitude),
                  lng: Number(parkInfo.longitude)
                }}
                markers={markers}
              />
            </div>
              {data.map((cg) => (
                <div className="grid__item grid__item--6">
                  <MediaCard 
                    key={cg.id}
                    img={cg.images.length ? `${cg.images[0].url}?quality=90&width=1000` : ''}
                    imgHeight={350}
                    title={cg.name}
                    subtitle=''
                    description={cg.description}
                    links={[
                      {href: cg.url, text: 'More info @ nps.gov'}                
                    ]}
                  />
                </div>
              ))}
          </div>
        </section>
      </SubPage>
    </Layout>
  )
}