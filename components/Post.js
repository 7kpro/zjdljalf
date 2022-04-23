import {
  HeartIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
  EyeIcon,
  DotsCircleHorizontalIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIcon2 } from '@heroicons/react/solid'
import { FaHeart } from 'react-icons/fa'
import {
  addDoc,
  orderBy,
  serverTimestamp,
  collection,
  setDocs,
  setDoc,
  doc,
  onSnapshot,
  query,
  where,
} from '@firebase/firestore'
import { LikeButton } from '@lyket/react'
import Link from 'next/link'
import countapi from 'countapi-js'

import { useSession } from 'next-auth/react'
import React, { useEffect, useState, setItem, state } from 'react'
import { db } from '../pages/firebase'
import Script from 'next/script'
import { async } from '@firebase/util'
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share'

function Post({ id, title, username, userImg, img, caption }) {
  const { data: session } = useSession()
  const [likes, setLikes] = useState([])
  // var [count, setCount] = useState(0)

  const [liked, setLiked] = useState(false)

  // const likePost = () => {
  //   setCount(count + 1)
  // }

  return (
    <div>
      <div className="my-7 flex space-x-2 rounded-sm border bg-white ">
        <div className="flex items-center p-2">
          <img
            src={userImg}
            className="mr-3 h-12 w-12 rounded-full border object-contain p-1"
            alt=""
          />

          <p className="flex-1  font-bold">{title}</p>
        </div>
      </div>
      {/* Image */}
      <img src={img} className="object-cover-w-full -mt-7" alt="" />
      {/*Buttons */}
      <div className=" flex justify-between rounded-sm border bg-white px-4 pt-4">
        <div className="flex space-x-4">
          {/* {liked ? (
            <HeartIcon2 className="btn text-red-500" />
          ) : (
            <HeartIcon onClick={likePost} className="btn" />
          )} */}

          <LikeButton id={id} template="twitter" className="btn" />
          <div>
            <FacebookShareButton url={`posts/${id}`} quote={title}>
              <FacebookIcon className="btn mt-2 pl-7" />
            </FacebookShareButton>
          </div>

          <div>
            <WhatsappShareButton url={`posts/${id}`} title={title}>
              <WhatsappIcon className="btn mt-2 pr-7" />
            </WhatsappShareButton>
          </div>
        </div>
        <Link href={`posts/${id}`}>
          <DotsCircleHorizontalIcon className="btn mt-2" />
        </Link>
      </div>

      {/* caption */}
      <p className="truncate p-5">
        <span className="mr-1 font-bold"> </span>
        {caption}
      </p>
    </div>
  )
}

export default Post
