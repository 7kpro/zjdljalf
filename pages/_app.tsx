import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { Provider } from '@lyket/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Provider apiKey="pt_c8ef2855264f2039b133452a1d8892">
          <Component {...pageProps} />
        </Provider>
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
