import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { spotApi } from '../services/spotify'

export default function useSpotify() {
  const { data: session, status } = useSession()

  // if refresh access token attempt fails, direct user to login page
  useEffect(() => {
    if (session) {
      session.error === 'RefreshAccessTokenError' ? signIn() : undefined
    }

    spotApi.setAccessToken(session?.user.accessToken)
  }, [session])

  return spotApi
}
