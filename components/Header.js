import React, { useState, useEffect } from 'react'
import { SearchIcon, ViewListIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { db } from '../pages/firebase'
import { collection, onSnapshot, query, orderBy } from '@firebase/firestore'
import './Posts'
import { MatchText, SearchProvider } from 'react-ctrl-f'

function Header() {
  const [querye, setQuery] = useState('')
  const [posts, setPosts] = useState([])

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs)
        }
      ),
    [db]
  )

  return (
    <div className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className=" v-screen flex max-w-xs justify-center xl:mx-auto">
        <div className=" relative mt-1 flex justify-between rounded-md p-3">
          <div className="pointer-events-none absolute inset-y-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input
            className=" black flex w-full   rounded-md border-gray-300 bg-gray-50 pl-10 focus:border-black focus:ring-black sm:text-sm "
            type="text"
            placeholder="Search"
          />

          {/* <div className="mt-5 h-2 w-3 bg-white">
            {posts.map((post) => (
              <li>{post.title}</li>
            ))}
          </div> */}

          {/* <HomeIcon className="h-10 w-10" /> */}
        </div>
      </div>
    </div>
  )
}

export default Header
