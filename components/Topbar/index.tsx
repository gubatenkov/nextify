import React from 'react'
import { useSession } from 'next-auth/react'

import UserWidget from '../UserWidget'
import { useSelector } from 'react-redux'
import { TRootState } from '../../interfacesAndTypes'

export default function Topbar() {
  const user = useSelector(({ user }: TRootState) => user)

  return (
    <header className="topbar p-4 text-white">
      <UserWidget {...user} />
    </header>
  )
}
