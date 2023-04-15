import Link from 'next/link'
import Banner from './banner'

export default function SubPage({ parkCode, pageTitle, children }) {
  return (
    <div>
      <Banner img={`/images/${parkCode}.jpeg`} />
      <div>
        <Link href="/">&lt; Home</Link>
        <Link href={`/park/${parkCode}`}>Info</Link>
        <Link href={`/visitor-centers/${parkCode}`}>Visitor Centers</Link>
        <Link href={`/things-to-do/${parkCode}`}>Things To Do</Link>
        <Link href={`/campgrounds/${parkCode}`}>Campgrounds</Link>
        <Link href={`/hiking/${parkCode}`}>Hiking</Link>
        <Link href={`/articles/${parkCode}`}>Articles</Link>
        <Link href={`/news/${parkCode}`}>News</Link>
      </div>
      <h1>Park Name</h1>
      <h2>{pageTitle}</h2>
      
      <div>
        {children}
      </div>
    </div>
  )
}