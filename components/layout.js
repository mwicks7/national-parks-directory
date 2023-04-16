import Head from 'next/head'
import styles from './layout.module.scss'
import MyAppBar from './myAppBar'

export const siteTitle = 'National Parks'

export default function Layout({ children }) {
  return (
    <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content="Learn about The United States national parks" />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
    <MyAppBar />
    <div className={styles.container}>
      <header className={styles.header}>
        
      </header>

      <main>
        {children}
      </main>      
    </div>
    </>
  );
}