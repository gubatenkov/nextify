import React from 'react'

import UserWidget from '../UserWidget'
import { useSelector } from 'react-redux'
import { IUser, TRootState } from '../../interfacesAndTypes'

export default function Topbar() {
  const user = useSelector(({ user }: TRootState) => user as unknown as IUser)

  return (
    <header className="topbar p-4 text-white">
      <UserWidget {...user} />
    </header>
  )
}
