import React from 'react'

import {
  IListIconItemProps,
  IListItemIcon,
  ISidebarData,
  Playlist,
} from '../../interfaces'
import { ListItemIcon, Logo, PlaylistItem } from '../'
import data from '../../data/sidebarData'
import { renderItems } from '../../utils/helperFunctions'

interface ISidebarProps {
  readonly playlists: Playlist[]
}

export default function Sidebar({ playlists }: ISidebarProps) {
  return (
    <aside className="sidebar h-screen min-w-[240px] max-w-[270px] p-6">
      <Logo className="mb-2 max-w-[130px] text-white" />
      <ul className="menu">{renderMenuWithSubMenus(data, ListItemIcon)}</ul>
      <ul className="playlists pt-4">{renderItems(playlists, PlaylistItem)}</ul>
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
