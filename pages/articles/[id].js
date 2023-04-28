import { getParkPaths, getParkInfo, getParkData } from '../../lib/dbParks'
import Layout from '../../components/layout'
import SubPage from '../../components/subPage'
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
      parkCode: params.id,
      parkInfo: parkInfo,
      data: parkData.data,
    } 
  }
}

export default function Articles({ parkCode, parkInfo, data }) {

  return (
    <Layout>
      <SubPage pageTitle='Articles' parkInfo={parkInfo} parkCode={parkCode}>
        <section>
          <div className="grid">
            {data.map((article) => (
              <div className="grid__item">
                <MediaCard 
                  imgHeight={500}
                  title={article.title}
                  subtitle={article.description}
                  description={article.listingDescription}
                  img={article.listingImage.url}
                  links={[
                    {href: article.url, text: 'More info @ nps.gov'}                
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