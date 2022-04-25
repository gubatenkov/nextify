import React from 'react'
import { useDispatch } from 'react-redux'

import {
  getDateStrFromTimestamp,
  getDurationStrFromMs,
} from '../../utils/helperFunctions'
import { setCurrentTrack } from '../../slices/currentPlaylistSlice'
import { IPlaylistTrack, TAppDispatch } from '../../interfacesAndTypes'
import { TrackArtistCover } from '../'

export default function PlaylistTrack({
  track,
  added_at,
  index,
}: IPlaylistTrack) {
  const dispatch = useDispatch<TAppDispatch>()
  const { id, name, album, duration_ms, artists } = track
  const imgUrl = album?.images[2]?.url

  const handleClick = () => dispatch(setCurrentTrack(track))

  return (
    <div
      className="track grid cursor-default grid-cols-[16px_6fr_4fr_3fr_minmax(120px,1fr)] items-center gap-3 rounded py-2 px-4 text-gray-400 hover:bg-white/10"
      onClick={handleClick}
    >
      <p>{index + 1}</p>
      <TrackArtistCover
        imgUrl={imgUrl}
        name={name}
        artists={artists[0]?.name}
      />
      <p className="text-sm">{album?.name}</p>
      <p className="text-sm">{getDateStrFromTimestamp(added_at)}</p>
      <p className="text-center text-sm">{getDurationStrFromMs(duration_ms)}</p>
    </div>
  )
}
