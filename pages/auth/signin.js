import { Main } from 'next/document'
import { MailIcon, KeyIcon } from '@heroicons/react/outline'
import { FaGoogle } from 'react-icons/fa'

import {
  providers,
  signIn as SignIntoProvider,
  getSession,
  getProviders,
  csrfToken,
} from 'next-auth/react'
import { async } from '@firebase/util'

//Browser....
function signIn({ providers }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-2">
      <main className=" flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="w-50 px-50 flex rounded-2xl bg-white shadow-2xl">
          <div className="py-25 w-3/5  px-20">
            <div className="py-10">
              <h2 className="mb-2 ml-5 text-3xl font-bold text-green-500">
                SIGN IN
              </h2>

              <div className="mb-6 ml-5 inline-block  w-10 border-2 border-green-500"></div>
              {/* <p className="my-1 mb-14 justify-center text-gray-400">
                Enter Google Account
              </p> */}
              <div className="my-2 flex justify-center"></div>
              <div className="flex flex-col items-center rounded-full pt-2">
                {/* <div className="mb-3 flex w-64 items-center bg-gray-100 p-2 outline-none">
                  <MailIcon className=" h-7 w-7 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className=" border-transparent bg-gray-100 text-gray-400 focus:border-transparent focus:ring-0"
                  />
                </div> */}
                {/* <div className="mb-4 flex w-64 items-center bg-gray-100 p-2 outline-none">
                  <KeyIcon className=" h-7 w-7 text-gray-400" />
                  <input
                    type="password"
                    name="Password"
                    placeholder="Password"
                    className="texxt-green-500 border-transparent bg-gray-100 text-gray-400 focus:border-transparent focus:ring-0"
                  />
                </div> */}
                <div className="my-2 flex justify-center">
                  <a className="mx-1 ml-5 rounded-full border-2 border-gray-200 p-7">
                    <FaGoogle className=" text-2xl" />
                  </a>
                </div>
                <>
                  {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                      <button
                        class="mt-4 ml-4 inline-block justify-center rounded-full border-2 border-green-500 px-12   py-2 text-center font-semibold hover:cursor-pointer hover:bg-green-500 hover:text-white"
                        onClick={() =>
                          SignIntoProvider(provider.id, {
                            callbackUrl: '/auth/admin',
                          })
                        }
                      >
                        SIGN IN
                      </button>
                    </div>
                  ))}
                </>

                {/* <a className="mt-4 inline-block rounded-full border-2 border-green-500 px-12 py-2   text-center font-semibold hover:cursor-pointer hover:bg-green-500 hover:text-white">
                  SIGN IN
                </a> */}
              </div>
            </div>
          </div>

          <div className="w-2/5 rounded-tr-2xl rounded-br-2xl bg-green-500 py-36 px-12 text-white">
            <h2 className="m-2 flex justify-center whitespace-pre px-20 py-10 pt-10 text-3xl font-bold ">
              Hello Ramiz
            </h2>
            <div className="mt-5 mb-5 inline-block w-20 border-2 border-white"></div>
          </div>
        </div>
      </main>
    </div>
  )
}

//Server

// SignInprovider.getInitialProps = async (context) => {
//   const { req, res } = context
//   const session = await getSession({ req })

//   if (session && res && session.accessToken) {
//     res.writeHead(302, {
//       Location: '/',
//     })
//     res.end()
//     return
//   }
//   return {
//     session: undefined,
//     providers: await providers(context),
//     csrfToken: await csrfToken(context),
//   }
// }

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
export default signIn
