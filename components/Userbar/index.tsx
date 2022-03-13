import React from 'react'
import { useSession } from 'next-auth/react'

import UserWidget from '../UserWidget'

export default function Userbar() {
  const { data: session } = useSession()

  return (
    <header className="p-4 text-white">
      <UserWidget {...session?.user} />
    </header>
  )
}
