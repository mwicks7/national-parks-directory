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
  const parkData = await getParkData('thingstodo', params.id)

  return { 
    props: { 
      parkCode: params.id,
      parkInfo: parkInfo,
      data: parkData.data,
    } 
  }
}

export default function Park({ parkCode, parkInfo, data }) {
  return (
    <Layout>
      <SubPage pageTitle="Things To Do" parkInfo={parkInfo} parkCode={parkCode}>
        <section>
          <div className="grid">
            {data.map((todo) => (
              <div className="grid__item">
                <MediaCard 
                  key={todo.id}
                  img={todo.images.length ? `${todo.images[0].url}?quality=90&width=1000` : ''}
                  imgHeight={500}
                  title={todo.title}
                  subtitle=''
                  description={todo.shortDescription}
                  links={[
                    {href: todo.url, text: 'More info @ nps.gov'}                
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