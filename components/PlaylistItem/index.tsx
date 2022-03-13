import React from 'react'
import { Playlist } from '../../interfaces'

export default function PlaylistItem({ name }: Playlist) {
  return (
    <li className="playlists-item cursor-pointer pb-2 text-[14px] text-gray-400 hover:text-white">
      {name.length > 20 ? name.slice(0, 30) + '...' : name}
    </li>
  )
}
