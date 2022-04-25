import React, { useEffect, useRef } from 'react'

import {
  IListIconItemProps,
  IListItemIcon,
  ISidebarData,
  IPlaylist,
} from '../../interfacesAndTypes'
import data from '../../data/sidebarData'
import { renderItems } from '../../utils/helperFunctions'
import { ListItemIcon, Logo, SidebarPlaylistItem, SidebarSkeleton } from '../'

interface ISidebarProps {
  readonly playlists: IPlaylist[]
}

export default function Sidebar({ playlists }: ISidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null)
  const playlistsRef = useRef<HTMLUListElement>(null)
  const sidebarInnerRef = useRef<HTMLDivElement>(null)

  // calc height of SidebarPlaylist on window resize
  useEffect(() => {
    // init calculation
    calcSidebarPlaylistHeight()
    // add listener on mount
    window.addEventListener('resize', calcSidebarPlaylistHeight)
    // remove it on unmount
    return () =>
      window.removeEventListener('resize', calcSidebarPlaylistHeight, false)
  }, [])

  function calcSidebarPlaylistHeight() {
    if (
      sidebarInnerRef?.current &&
      playlistsRef?.current &&
      sidebarRef?.current
    ) {
      const sidebarHeight = sidebarRef.current.getBoundingClientRect().height
      const sidebarInnerHeight =
        sidebarInnerRef.current.getBoundingClientRect().height
      playlistsRef.current.style.height = `${
        sidebarHeight - sidebarInnerHeight
      }px`
    }
  }

  return (
    <aside className="sidebar min-w-[240px]" ref={sidebarRef}>
      <div className="sidebar-inner-wrap" ref={sidebarInnerRef}>
        <div className="sidebar-brand px-6 pt-6">
          <Logo className="max-w-[130px] text-white" />
        </div>
        <ul className="menu">{renderMenuWithSubMenus(data, ListItemIcon)}</ul>
      </div>
      <div className="playlists-wrap overflow-hidden">
        <ul
          className="playlists scrollbar-track-transparrent overflow-y-auto pt-4 scrollbar-thin scrollbar-thumb-gray-900"
          ref={playlistsRef}
        >
          {playlists?.length ? (
            renderItems(playlists, SidebarPlaylistItem)
          ) : (
            <SidebarSkeleton />
          )}
        </ul>
      </div>
    </aside>
  )
}

const renderMenuWithSubMenus = (
  data: ISidebarData,
  Component: React.FC<IListIconItemProps>
): JSX.Element[] => {
  const submenus = Object.values(data)
  return submenus.map((submenu: IListItemIcon[], idx) => (
    <ul
      className="submenu mx-6 border-b-[1px] border-gray-900 pt-4 text-gray-400"
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
