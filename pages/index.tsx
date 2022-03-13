import Head from 'next/head'
import { shuffle } from 'lodash'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import useSpotify from '../hooks/useSpotify'
import { Sidebar, SongList, Userbar } from '../components'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-pink-500',
  'from-yellow-500',
  'from-purple-500',
  'from-red-500',
]

const Home: NextPage = () => {
  const api = useSpotify()
  const { data: session, status } = useSession()
  const [color, setColor] = useState<string | undefined>(undefined)
  const [playlists, setPlaylists] = useState([])

  // fetch user playlists from an api
  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const playlists = await api.getUserPlaylists()
        setPlaylists(playlists.body.items)
      } catch (err) {
        console.log(err)
      }
    }

    if (api.getAccessToken()) {
      getPlaylists()
    }
  }, [session, api])

  // set SongList bg-color to picked one from an array
  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [])

  return (
    <div className="app h-screen overflow-hidden bg-black">
      <Head>
        <title>Nextify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main flex">
        <Sidebar playlists={playlists} />
        <div
          className={`content flex-grow bg-gradient-to-b ${color} via-black to-black`}
        >
          <Userbar />
          <SongList />
        </div>
      </main>
    </div>
  )
}

export default Home
