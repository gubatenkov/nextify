import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Playlist } from '../'
import PlaylistInfo from '../PlaylistInfo'
import useGetPlaylistTracks from '../../utils/useGetPlaylistTracks'
import { useLazyGetPlaylistByIdQuery } from '../../palylistAPI/playlistsApi'
import { setCurrentPlaylist } from '../../slices/currentPlaylistSlice'
import { IPlaylist, TAppDispatch, TRootState } from '../../interfacesAndTypes'

export default function PageContent() {
  const dispatch = useDispatch<TAppDispatch>()
  const [fetchPlaylsitById, result] = useLazyGetPlaylistByIdQuery()
  const storedPlaylists = useSelector((state: TRootState) => state.playlists)
  const currentPlaylist = useSelector(
    (state: TRootState) => state.current.currentPlaylist
  )
  const currentPlaylistId = useSelector(
    (state: TRootState) => state.current.currentPlaylistId
  )
  const [tracks, isLoading] = useGetPlaylistTracks(
    currentPlaylist?.tracks?.href
  )

  const getPlaylistByIdFromCache = (id: string): IPlaylist | undefined => {
    const wanted = storedPlaylists.find((el: IPlaylist) => el.id === id)
    return wanted
  }

  /* Render the playlist from cache to minimize api calls
  1) if playlist exist in cache - set it as current
  2) if not, fetch it by playlistId
  */
  useEffect(() => {
    let wanted: IPlaylist | undefined
    if (currentPlaylistId) {
      wanted = getPlaylistByIdFromCache(currentPlaylistId)
      if (wanted) dispatch(setCurrentPlaylist(wanted))
    }
    if (!wanted && currentPlaylistId) {
      fetchPlaylsitById(currentPlaylistId)
        .unwrap()
        .then((playlist: IPlaylist) => dispatch(setCurrentPlaylist(playlist)))
        .catch((err) => console.log(err))
    }
  }, [currentPlaylistId])

  // TODO: add playlist placeholder
  if (!currentPlaylist) return <div>There is no playlist yet...</div>

  return (
    <section className="text-white ">
      <PlaylistInfo {...currentPlaylist} />
      <Playlist tracks={tracks} />
    </section>
  )
}
