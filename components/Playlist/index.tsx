import React from 'react'
import { ClockIcon } from '@heroicons/react/outline'

import { PlaylistTrack } from '../'
import { IPlaylistTrack } from '../../interfacesAndTypes'

interface IPlaylistProps {
  tracks: IPlaylistTrack[] | null
}

function Playlist({ tracks }: IPlaylistProps) {
  return (
    <div className="playlsit mx-8">
      <PlaylistHeader />
      <div className="playlist-inner pb-[90px]">
        <div className="playlist-content">
          {tracks?.length &&
            tracks
              .filter((item) => item.track)
              .map((track, idx) =>
                track ? (
                  <PlaylistTrack key={idx} {...track} index={idx} />
                ) : null
              )}
        </div>
      </div>
    </div>
  )
}

function PlaylistHeader() {
  return (
    <div className="playlist-header mb-4 grid grid-cols-[16px_6fr_4fr_3fr_minmax(120px,1fr)] gap-5 border-b border-white/10 px-4 text-xs font-medium uppercase leading-8 text-gray-400">
      <p>#</p>
      <p>Title</p>
      <p>Album</p>
      <p>Addition date</p>
      <p className="flex flex-col justify-center">
        <ClockIcon className="mx-auto max-w-[15px]" />
      </p>
    </div>
  )
}

export default Playlist
