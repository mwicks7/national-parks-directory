import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { urlString } from '../lib/utilities'
import Drawer from './drawer'

export const siteTitle = 'US National Parks Map Directory'

function getStates(parks) {
  let states = []
  parks.map(park => {
    if (!states.includes(park.location.stateFull)) {
      states.push(park.location.stateFull)
    }
  })
  return states
}

export default function Layout({ page, children }) {
  const [toggleNav, setToggleNav] = useState(false)
  const [navItems, setNavItems] = useState([])

  useEffect(() => {
    const fetchParks = async () => {
      const response = await fetch('/api/parks')
      const parks = await response.json()
      const states = getStates(parks)
      console.log(states)
      setNavItems(states)
    }

    fetchParks()
  }, [setNavItems])

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>{siteTitle}</title>
        <meta name="description" content="Learn about The United States national parks" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className="header paper">
        <div className="container">
          <div className="flex">
            <div className="flex__item flex__item--2">
              <button 
                className="app__menu-btn app__menu-btn--nav"
                onClick={() => setToggleNav((prev) => !prev)}
                id="navDrawerTrigger"
              >
                <Image 
                  src={'/images/menu.svg'} 
                  height={30} 
                  width={30} 
                  alt="Open navigation"
                />
              </button>
            </div>
            <div className="flex__item flex__item--8 align-center">
              <Link className="logo" href="/">
                <Image src="/images/npd_logo.svg" height={24} width={24} alt="Logo"/>
                US National Parks Directory
              </Link>
            </div>
          </div>
          {/* {page === 'Home' &&
           
          } */}
        </div>
      </header>

      <main>
        <div className="container">
          {children}
        </div>
      </main>   

      <Drawer 
        location="left"
        toggleState={toggleNav}
        setToggleState={setToggleNav}
        id="navDrawer"
        triggerId="navDrawerTrigger"
      >
        <nav className="primary-nav">
          <ul>
            {navItems.map((nav) => (
              <li>
                <Link 
                  key={nav} 
                  href={'/#' + urlString(nav)}
                  onClick={() => setToggleNav(false)}
                >{nav}</Link> 
              </li>
            ))}
          </ul>
        </nav>
      </Drawer>   
    </>
  )
}