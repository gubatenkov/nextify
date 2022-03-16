import Head from 'next/head'
import type { NextPage } from 'next'
import { useMemo, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'

import colors from '../data/colors'
import { setUser } from '../slices/userSlice'
import { setPlaylists } from '../slices/playlistsSlice'
import { Sidebar, SongList, Topbar } from '../components'
import { useLazyGetAllPlaylistsQuery } from '../api/playlistsApi'
import { TRootState, TAppDispatch } from '../interfacesAndTypes'

const Home: NextPage = () => {
  const dispatch = useDispatch<TAppDispatch>()
  const { data: session, status } = useSession()
  // const playlists = useSelector(({ playlists }: TRootState) => playlists)
  // const [trigger, { data, isSuccess, isUninitialized }, lastPromiseInfo] =
  //   useLazyGetAllPlaylistsQuery()
  const randomBgColor = useMemo(
    () => colors[Math.floor(Math.random() * colors.length)],
    [colors.length]
  )
  console.log(session)

  // set playlists to the global state
  // useEffect(() => {
  //   if (!isUninitialized && isSuccess) {
  //     dispatch(setPlaylists(data?.items))
  //   }
  // }, [isSuccess, data])

  // set user to the global state after success auth
  // useEffect(() => {
  //   if (session) {
  //     dispatch(setUser(session.user))
  //     trigger(session.user.accessToken)
  //   }
  // }, [session])

  return (
    <div className="app h-screen overflow-hidden bg-black">
      <Head>
        <title>Nextify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main flex">
        <Sidebar playlists={[]} />
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
