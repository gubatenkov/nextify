import React from 'react'
import { Playlist } from '../interfaces'

export function renderItems(items: Playlist[], Component: React.FC<any>) {
  if (items?.length > 0) {
    return items.map((item, idx) => <Component key={idx} {...item} />)
  }
  return null
}
