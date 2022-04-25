import React from 'react'
import { IListIconItemProps } from '../../interfacesAndTypes'

export default function ListIconItem({
  icon: Icon,
  children,
}: IListIconItemProps) {
  return (
    <li className="submenu-item flex cursor-pointer items-center pb-4 text-sm font-bold tracking-normal hover:text-white">
      <Icon className="mr-4 h-5 w-5" />
      <p>{children}</p>
    </li>
  )
}
