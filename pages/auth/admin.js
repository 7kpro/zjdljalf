import { async } from '@firebase/util'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import { db, storage } from '../firebase'
import { ref, getDownloadURL, uploadString } from '@firebase/storage'

import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  getDoc,
  doc,
} from '@firebase/firestore'

export default function admin() {
  const { data: session, status } = useSession()
  const filePickerRef = useRef(null)
  const captionRef = useRef(null)
  const titleRef = useRef(null)
  const categoryRef = useRef(null)

  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(null)

  const uploadPost = async () => {
    if (loading) return

    setLoading(true)

    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.name,
      caption: captionRef.current.value,
      title: titleRef.current.value,
      profile: session.user.image,
      category: categoryRef.current.value,
      timestamp: serverTimestamp(),
    })

    const imageRef = ref(storage, `posts/${docRef.id}/image`)

    await uploadString(imageRef, selectedFile, 'data_url').then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef)
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        })
      }
    )
    setLoading(false)
    setSelectedFile(null)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  if (
    status === 'authenticated' &&
    session.user.email == 'kaustubhnardelwar14678@gmail.com'
  ) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-2">
        <main className=" flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <div className="w-50 px-50 flex rounded-2xl bg-white shadow-2xl">
            <div className="py-25 w-3/5  px-20">
              <div className="py-10">
                <h2 className="mb-2 ml-5 text-3xl font-bold text-green-500">
                  UPLOAD
                </h2>

                <div className="mb-6 ml-5 inline-block  w-10 border-2 border-green-500"></div>

                <div className="my-2 flex justify-center"></div>
                <div className="flex flex-col items-center rounded-full pt-2">
                  {selectedFile ? (
                    <img
                      className="w-full cursor-pointer object-contain"
                      src={selectedFile}
                      onClick={() => setSelectedFile(null)}
                    />
                  ) : (
                    <div
                      onClick={() => filePickerRef.current.click()}
                      className="mx-1 ml-5 rounded-full border-2 border-gray-200 p-7"
                    >
                      <FaCamera className=" text-2xl" />
                    </div>
                  )}
                  <div className="mt-0">
                    <select
                      ref={categoryRef}
                      className="mt-8 rounded-xl border "
                    >
                      <option value="PEOPLE">PEOPLE</option>
                      <option value="FOOTBALL">FOOTBALL</option>

                      <option value="BUZZ">BUZZ</option>
                    </select>

                    <input
                      ref={titleRef}
                      placeholder="TITLE"
                      type="text"
                      className="  
                     mt-14
                      ml-1
                      block
                      w-full
                      rounded
                      border
                      border-solid
                      border-gray-300
                      bg-gray-100
                      bg-clip-padding px-3
                      py-1.5 text-center text-base
                      font-normal
                      text-gray-700
                      transition
                      ease-in-out
                      focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                    ></input>
                  </div>
                  <div className="mt-0">
                    <input
                      ref={captionRef}
                      placeholder="CAPTION"
                      type="text"
                      className="  
                     mt-2
                      ml-1
                      block
                      w-full
                      rounded
                      border
                      border-solid
                      border-gray-300
                      bg-gray-100
                      bg-clip-padding px-3
                      py-1.5 text-center text-base
                      font-normal
                      text-gray-700
                      transition
                      ease-in-out
                      focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                    ></input>
                  </div>
                  <button
                    onClick={uploadPost}
                    disabled={!selectedFile}
                    class="mt-4 mr-2 ml-4 inline-block justify-center rounded-full border-2 border-green-500 px-12   py-2 text-center font-semibold hover:cursor-pointer hover:bg-green-500 hover:text-white"
                  >
                    {loading ? 'Uploading...' : 'POST'}
                  </button>
                  <div>
                    <input
                      ref={filePickerRef}
                      type="file"
                      hidden
                      onChange={addImageToPost}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-2/5 rounded-tr-2xl rounded-br-2xl bg-green-500 py-36 px-12 text-white">
              <h2 className="m-2 flex justify-center whitespace-pre px-20 py-10 pt-10 text-3xl font-bold ">
                UPLOAD
              </h2>

              <div className="mt-5 mb-5 inline-block w-20 border-2 border-white"></div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return <h1>Please SignIn First</h1>
}
