import Head from 'next/head'
import Link from 'next/link'

export const siteTitle = 'US National Parks Map Directory'

export default function Layout({ page, children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>{siteTitle}</title>
        <meta name="description" content="Learn about The United States national parks" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className="header">
        <div className="container">
          <Link href="/">US National Parks Directory</Link>
          {/* {page === 'Home' &&
           
          } */}
        </div>
      </header>

      <main className="container">
        {children}
      </main>      
    </>
  )
}