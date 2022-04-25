import React from 'react'

import PlaylistCover from './PlaylistCover'
import { IPlaylist } from '../../interfacesAndTypes'

export default function PlaylistInfo({
  images,
  description,
  name,
  owner,
}: IPlaylist) {
  return (
    <div className="playlist-info flex p-8">
      <PlaylistCover cover={images[0].url} />

      <div className="playlist-text ml-6 flex flex-1 flex-col justify-end">
        <h2 className="playlist-suptitle text-sm font-bold uppercase">
          Playlist
        </h2>
        <h1 className="playlist-title py-2 text-[4vw] font-bold leading-[100%]">
          {name}
        </h1>
        <p className="playlist-descr text-md text-gray-300">{description}</p>
      </div>
    </div>
  )
}
