import React from 'react'
import { IPlaylist } from '../interfacesAndTypes'

export function renderItems(items: IPlaylist[], Component: React.FC<any>) {
  if (items?.length > 0) {
    return items.map((item, idx) => <Component key={idx} {...item} />)
  }
  return null
}
