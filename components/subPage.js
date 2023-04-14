import Link from 'next/link'

export default function SubPage({ parkCode, children }) {
  return (
    <div>
      <Link href="/">&lt; Home</Link><br />
      <Link href={`/park/${parkCode}`}>Info</Link><br />
      <Link href={`/visitor-centers/${parkCode}`}>Visitor Centers</Link><br />
      <Link href={`/things-to-do/${parkCode}`}>Things To Do</Link><br />
      <Link href={`/campgrounds/${parkCode}`}>Campgrounds</Link><br />
      <Link href={`/hiking/${parkCode}`}>Hiking</Link><br />
      <Link href={`/articles/${parkCode}`}>Articles</Link><br />
      <Link href={`/news/${parkCode}`}>News</Link><br />
      
      <div>
        {children}
      </div>
    </div>
  )
}