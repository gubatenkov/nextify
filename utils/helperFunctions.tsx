import React from 'react'

import months from './month'
import { IPlaylist } from '../interfacesAndTypes'

export function renderItems(items: IPlaylist[], Component: React.FC<any>) {
  if (items?.length > 0) {
    return items.map((item, idx) => <Component key={idx} {...item} />)
  }
  return null
}

const daysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate()
}

export const getDateStrFromTimestamp = (stamp: Date) => {
  const month = new Date(stamp).getUTCMonth()
  const year = new Date(stamp).getUTCFullYear()
  const day = new Date(stamp).getUTCDate()
  const currentMonth = new Date().getUTCMonth()
  const hoursAgo = 24 - new Date(stamp).getHours()

  if (month === currentMonth) {
    // const totalDaysInCurrMonth = daysInMonth(month, year)
    const today = new Date().getUTCDate()
    const daysDifference = today - day
    if (!daysDifference) {
      return hoursAgo === 1 ? `${hoursAgo} hour ago` : `${hoursAgo} hours ago`
    }
    return daysDifference === 1
      ? `${daysDifference} day ago`
      : `${daysDifference} days ago`
  }

  return `${day} ${months[month]} ${year}`
}

export const getDurationStrFromMs = (ms: number): string => {
  const mins = Math.floor(ms / 1000 / 60)
  let secs = Number(Math.floor(ms / 1000)) % 60
  let res
  res = secs
  if (secs < 10) {
    res = `0${secs}`
  }
  if (!secs) {
    return `${mins}:00`
  }
  return `${mins}:${res}`
}
