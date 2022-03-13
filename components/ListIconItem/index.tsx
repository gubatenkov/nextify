import React from 'react'
import { IListIconItemProps } from '../../interfaces/'

export default function ListIconItem({
  icon: Icon,
  children,
}: IListIconItemProps) {
  return (
    <li className="list__item flex cursor-pointer items-center pb-3 hover:text-white">
      <Icon className="mr-2 h-5 w-5" />
      <p>{children}</p>
    </li>
  )
}
