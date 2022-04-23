import React from 'react'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  getDocs,
  getDoc,
  docs,
  onSnapshot,
  query,
  orderBy,
  doc,
} from '@firebase/firestore'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { db } from '../firebase'
import { async } from '@firebase/util'
import { LikeButton } from '@lyket/react'

import Link from 'next/link'
import { DotsCircleHorizontalIcon } from '@heroicons/react/outline'
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share'
import { useEffect, useState, useRef } from 'react'

function PostPage({ postsProps, params }) {
  const [posts, setPosts] = useState([])
  var obj = JSON.parse(postsProps)

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
    <div className="ml-20 mr-20 pr-20 pl-20 ">
      <div className="my-7 flex space-x-2 rounded-sm border bg-white ">
        <div className="flex items-center p-2">
          <img
            src={obj.profile}
            className="mr-3 h-12 w-12 justify-center rounded-full border object-contain p-1"
            alt=""
          />

          <p className=" font-bold">{obj.title}</p>
        </div>
      </div>
      {/* Image */}
      <img src={obj.image} className="object-cover-w-full -mt-7" alt="" />
      {/*Buttons */}
      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          <LikeButton id={params} className="btn" />
          <div>
            <FacebookShareButton url={`posts/${params}`} quote={obj.title}>
              <FacebookIcon className="btn mt-2 pl-7" />
            </FacebookShareButton>
          </div>

          <div>
            <WhatsappShareButton url={`posts/${params}`} title={obj.title}>
              <WhatsappIcon className="btn mt-2 pr-7" />
            </WhatsappShareButton>
          </div>
        </div>
        <Link href={`posts/${params}`}>
          <DotsCircleHorizontalIcon className="btn mt-2" />
        </Link>
      </div>

      {/* caption */}
      <p className="truncate p-5">
        <span className="mr-1 font-bold"> </span>
        {obj.caption}
      </p>
    </div>
  )
}

export async function getStaticPaths() {
  const snapshot = await getDocs(collection(db, 'posts'))

  const paths = snapshot.docs.map((doc) => {
    return {
      params: { id: doc.id.toString() },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const id = params.id

  const docRef = doc(db, 'posts', id)
  const docSnap = await getDoc(docRef)

  return {
    props: { postsProps: JSON.stringify(docSnap.data()) || null },
  }
}

export default PostPage
