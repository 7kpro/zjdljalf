import React, { useEffect, useState, useRef } from 'react'
import Post from './Post'
import { collection, onSnapshot, query, orderBy } from '@firebase/firestore'
import { db } from '../pages/firebase'

function Posts() {
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
    <div className="justify-center md:pr-20 md:pl-10 ">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profile}
          img={post.data().image}
          caption={post.data().caption}
          title={post.data().title}
        />
      ))}
    </div>
  )
}

export default Posts
