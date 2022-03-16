import React from 'react'

import {
  IListIconItemProps,
  IListItemIcon,
  ISidebarData,
  IPlaylist,
} from '../../interfacesAndTypes'
import data from '../../data/sidebarData'
import { renderItems } from '../../utils/helperFunctions'
import { ListItemIcon, Logo, PlaylistItem, PlaylistSkeleton } from '../'

interface ISidebarProps {
  readonly playlists: IPlaylist[]
}

export default function Sidebar({ playlists }: ISidebarProps) {
  return (
    <aside className="sidebar h-screen min-w-[240px] max-w-[240px] p-6">
      <Logo className="mb-2 max-w-[130px] text-white" />
      <ul className="menu">{renderMenuWithSubMenus(data, ListItemIcon)}</ul>
      <ul className="playlists pt-4">
        {playlists?.length ? (
          renderItems(playlists, PlaylistItem)
        ) : (
          <PlaylistSkeleton />
        )}
      </ul>
    </aside>
  )
}

function renderMenuWithSubMenus(
  data: ISidebarData,
  Component: React.FC<IListIconItemProps>
) {
  const submenus = Object.values(data)
  return submenus.map((submenu: IListItemIcon[], idx) => (
    <ul
      className="submenu border-b-[1px] border-gray-900 pt-4 text-gray-400"
      key={idx}
    >
      {submenu.map((subitem: IListItemIcon) => (
        <Component key={subitem.id} {...subitem}>
          {subitem.text}
        </Component>
      ))}
    </ul>
  ))
}
