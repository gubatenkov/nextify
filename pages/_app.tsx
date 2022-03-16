import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { PersistGate } from 'redux-persist/integration/react'

import '../styles/globals.css'

import store, { persistor } from '../store'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <Component {...pageProps} />
        {/* </PersistGate> */}
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
