import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.scss'

export const siteTitle = 'National Parks'

export default function Layout({ page, children }) {
  return (
    <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content="Learn about The United States national parks" />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>

    <div className={styles.container}>
      <header className={styles.header}>
        {page !== 'Home' &&
          <Link href="/">
            &lt; All Parks
          </Link>
        }
      </header>

      <main>
        {children}
      </main>      
    </div>
    </>
  );
}