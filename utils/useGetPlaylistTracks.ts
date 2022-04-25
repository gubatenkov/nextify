import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import {
  IPlaylistTrack,
  IUser,
  TAppDispatch,
  TRootState,
} from '../interfacesAndTypes'

export default function useGetPlaylistTracks(
  url: string
): [IPlaylistTrack[] | null, boolean] {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState<IPlaylistTrack[] | null>(null)
  const user = useSelector(({ user }: TRootState) => user as unknown as IUser)

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        const data = await res.json()
        setData(data.items)
      } catch (err) {
        console.log(err)
        setData(null)
      }
      setLoading(false)
    }
    if (user && url) fetchUrl()
  }, [url, user])

  return [data, isLoading]
}
