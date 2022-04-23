import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Feed from '../components/Feed'
import InfiniteScroll from 'react-infinite-scroll-component'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>RamizBarro</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* Header */}

      {/* Feed */}

      <Feed />

      {/* Model */}
    </div>
  )
}

export default Home
