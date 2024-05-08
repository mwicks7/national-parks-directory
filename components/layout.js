import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { urlString } from "../lib/utilities"
import Drawer from "./drawer"

const siteTitle = "US National Parks Map Directory"

function getStates(parks) {
  let states = []
  parks.map((park) => {
    if (!states.includes(park.location.stateFull)) {
      states.push(park.location.stateFull)
    }
  })
  return states
}

export default function Layout({ page, children }) {
  const [toggleNav, setToggleNav] = useState(false)
  const [navItems, setNavItems] = useState([])
  const { pathname } = useRouter()

  useEffect(() => {
    const fetchParks = async () => {
      const response = await fetch("/api/parks")
      const parks = await response.json()
      const states = getStates(parks)
      setNavItems(states)
    }

    fetchParks()
  }, [setNavItems])

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>{siteTitle}</title>
        <meta
          name="description"
          content="Learn about The United States national parks"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className="header">
        <button
          className="header__menu-button"
          onClick={() => setToggleNav((prev) => !prev)}
          id="navDrawerTrigger"
        >
          <Image
            src={"/images/arrow-down.svg"}
            height={15}
            width={15}
            alt="Open navigation"
          />
          <b>States</b>
        </button>

        <Link className="header__logo" href="/">
          <Image src="/images/npd_logo.svg" height={24} width={24} alt="Logo" />
          {pathname === "/" ? <h1>{siteTitle}</h1> : <>{siteTitle}</>}
        </Link>
      </header>

      <main>{children}</main>

      <Drawer
        location="left"
        toggleState={toggleNav}
        setToggleState={setToggleNav}
        id="navDrawer"
        triggerId="navDrawerTrigger"
      >
        <nav className="nav">
          <ul className="nav__items">
            {navItems.map((nav) => (
              <li className="nav__item" key={nav}>
                <Link
                  className="nav__link"
                  href={"/#" + urlString(nav)}
                  onClick={() => setToggleNav(false)}
                >
                  {nav}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Drawer>
    </>
  )
}
