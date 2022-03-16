import React from 'react'
import { IPlaylist } from '../../interfacesAndTypes'

export default function PlaylistItem({ name }: IPlaylist) {
  return (
    <li className="playlists-item cursor-pointer pb-2 text-[12px] text-gray-400 hover:text-white">
      {name.length > 20 ? name.slice(0, 30) + '...' : name}
    </li>
  )
}
