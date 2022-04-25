import React from 'react'
import { useDispatch } from 'react-redux'

import { IPlaylist } from '../../interfacesAndTypes'
import { setCurrentPlaylistId } from '../../slices/currentPlaylistSlice'

export default function SidebarPlaylistItem({ name, id }: IPlaylist) {
  const dispatch = useDispatch()

  const handleClick = () => dispatch(setCurrentPlaylistId(id))

  return (
    <li
      className="playlists-item cursor-default px-6 pb-3 text-sm tracking-normal text-gray-400 hover:text-white"
      onClick={handleClick}
    >
      {name.length > 20 ? name.slice(0, 26) + '...' : name}
    </li>
  )
}
