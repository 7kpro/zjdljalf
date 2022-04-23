import Post from './Post'
import Posts from './Posts'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import InfiniteScroll from 'react-infinite-scroll-component'

function Feed() {
  return (
    <main className="mx-auto  grid grid-cols-1 md:max-w-3xl md:grid-cols-2 ">
      <section className="col-span-2">
        {/* Posts */}

        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts />
        <Posts />
      </section>
    </main>
  )
}

export default Feed
