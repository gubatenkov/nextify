import Head from 'next/head'
import type { NextPage } from 'next'
import { useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSession, GetSessionParams, useSession } from 'next-auth/react'

import { setUser } from '../slices/userSlice'
import { setPlaylists } from '../slices/playlistsSlice'
import { useLazyGetAllPlaylistsQuery } from '../api/playlistsApi'
import { Sidebar, PageContent, Topbar, Player } from '../components'
import {
  setCurrentPlaylist,
  setCurrentTrack,
} from '../slices/currentPlaylistSlice'
import { TRootState, TAppDispatch, IPlaylist } from '../interfacesAndTypes'
import { useLazyGetPlayingTrackQuery } from '../api/trackApi'

const colors = [
  'from-indigo',
  'from-pink',
  'from-yellow',
  'from-purple',
  'from-red',
]

const Home: NextPage = () => {
  const dispatch = useDispatch<TAppDispatch>()
  const { data: session, status } = useSession()
  const playlists = useSelector(({ playlists }: TRootState) => playlists)
  const currentPlaylistId = useSelector(
    (state: TRootState) => state.current.currentPlaylistId
  )
  const [trigger, { data, isSuccess, isUninitialized }, lastPromiseInfo] =
    useLazyGetAllPlaylistsQuery()
  const [getPlayingTrack, getPlayingTrackResult] = useLazyGetPlayingTrackQuery()
  const randomBgColor = useMemo(
    () => colors[Math.floor(Math.random() * colors.length)],
    [colors.length, currentPlaylistId]
  )

  useEffect(() => {
    // if session ok
    if (session) {
      // put user obj to the global store
      dispatch(setUser(session.user))
      // then we able to start fetching user playlists with his token
      trigger(session.user.accessToken)
      // also fetch currently playing track
      getPlayingTrack()
    }
  }, [session])

  useEffect(() => {
    // if fetching was success
    if (!isUninitialized && isSuccess) {
      // send data to the global state
      const playlists = data as IPlaylist[]
      dispatch(setPlaylists(playlists))
      dispatch(setCurrentPlaylist(playlists[0]))
    }
    // if current playing track was fetched set it to the global state
    if (getPlayingTrackResult.isSuccess && getPlayingTrackResult.data) {
      const { item, is_playing } = getPlayingTrackResult.data
      const track = JSON.parse(JSON.stringify(item))
      track.is_playing = is_playing
      dispatch(setCurrentTrack(track))
    }
  }, [isUninitialized, isSuccess, data, getPlayingTrackResult])

  return (
    <div className="app h-screen overflow-hidden bg-black">
      <Head>
        <title>Nextify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main flex flex-col">
        <div className="main-inner flex h-[calc(100vh_-_90px)]">
          <Sidebar playlists={playlists} />
          <div
            className={`content song-list h-screen flex-grow overflow-y-scroll bg-gradient-to-b ${randomBgColor} via-black to-black scrollbar-hide`}
          >
            <Topbar />
            <PageContent />
          </div>
        </div>
        <Player
          bgColor={colors.reduce((acc, color, idx) => {
            color === randomBgColor ? (acc = idx) : null
            return acc
          }, 0)}
        />
      </main>
    </div>
  )
}

// client will receive a prerendered user session info
export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}

export default Home
