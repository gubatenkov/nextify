import Head from 'next/head'
import type { NextPage } from 'next'
import { useMemo, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'

import { setUser } from '../slices/userSlice'
import { setPlaylists } from '../slices/playlistsSlice'
import { Sidebar, SongList, Topbar } from '../components'
import { useLazyGetAllPlaylistsQuery } from '../api/playlistsApi'
import { TRootState, TAppDispatch } from '../interfacesAndTypes'

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
  const dispatch = useDispatch<TAppDispatch>()
  const { data: session, status } = useSession()
  const playlists = useSelector(({ playlists }: TRootState) => playlists)
  const [trigger, { data, isSuccess, isUninitialized }, lastPromiseInfo] =
    useLazyGetAllPlaylistsQuery()
  const randomBgColor = useMemo(
    () => colors[Math.floor(Math.random() * colors.length)],
    [colors.length]
  )

  // set user to the global state after success auth
  useEffect(() => {
    if (session) {
      dispatch(setUser(session.user))
      // get user playlists with his token
      trigger(session.user.accessToken)
    }
  }, [session])

  // set playlists to the global state
  useEffect(() => {
    if (!isUninitialized && isSuccess) {
      dispatch(setPlaylists(data?.items))
    }
  }, [isSuccess, data])

  return (
    <div className="app h-screen overflow-hidden bg-black">
      <Head>
        <title>Nextify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main flex">
        <Sidebar playlists={playlists} />
        <div
          className={`content flex-grow bg-gradient-to-b ${randomBgColor} via-black to-black`}
        >
          <Topbar />
          <SongList />
        </div>
      </main>
    </div>
  )
}

export default Home
