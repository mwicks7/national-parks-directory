import { getParkPaths, getParkInfo, getParkData } from '../../lib/dbParks'
import Layout from '../../components/layout'
import ParkPage from '../../components/parkPage'
import MediaCard from '../../components/mediaCard'

export async function getStaticPaths() {
  const paths = await getParkPaths()
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const parkInfo = await getParkInfo(params.id)
  const parkData = await getParkData('articles', params.id)

  return {
    props: {
      parkInfo: parkInfo,
      data: parkData.data,
    }
  }
}

export default function Articles({ parkInfo, data }) {
  return (
    <Layout>
      <ParkPage
        pageTitle='Articles'
        parkInfo={parkInfo}
      >
        {data.map((article) => (
          <MediaCard
            imgHeight={500}
            title={article.title}
            subtitle={article.description}
            description={article.listingDescription}
            img={article.listingImage.url}
            links={[
              {href: article.url, text: 'Read more at nps.gov'}
            ]}
          />
        ))}
      </ParkPage>
    </Layout>
  )
}
