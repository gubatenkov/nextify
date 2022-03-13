import Head from 'next/head'
import type { NextPage } from 'next'

import { Sidebar, SongList, Userbar } from '../components'

const Home: NextPage = () => {
  return (
    <div className="app h-screen overflow-hidden bg-black">
      <Head>
        <title>Nextify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main flex">
        <Sidebar />
        <div className="content flex-grow bg-gradient-to-b from-indigo-500 via-black to-black">
          <Userbar />
          <SongList />
        </div>
      </main>
    </div>
  )
}

export default Home
