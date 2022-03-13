import React, { useEffect, useState } from 'react'
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  useSession,
} from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'

import logo from '../assets/images/spotify.svg'
import { NextPage } from 'next'
import { Spinner } from '../components'

interface ILoginProps {
  readonly providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >
}

const Login: NextPage<ILoginProps> = ({ providers }) => {
  const { data: session, status } = useSession()
  const [isUserLoading, setUserLoading] = useState(false)

  const onClickSignIn = (providerId: string) => {
    setUserLoading(true)
    signIn(providerId, { callbackUrl: '/' })
  }

  useEffect(() => {
    if (status === 'loading') {
      setUserLoading(true)
    } else {
      setUserLoading(false)
    }
  }, [status])

  return (
    <div className="login flex h-screen flex-col items-center justify-center bg-black">
      <div className="login-inner">
        <img
          className="login-img mx-auto mb-5 max-w-[100px] animate-bounce"
          src={logo.src}
          alt="spotify logo"
        />
        {/* list of providers(1) to sign in with  */}
        {Object.values(providers).map((provider) => (
          <button
            className="max-w-[250px] rounded-full bg-gradient-to-r from-blue-400 px-5 py-2 text-white transition delay-150 ease-in-out hover:from-blue-400 hover:to-blue-400"
            key={provider.name}
            onClick={() => onClickSignIn(provider.id)}
          >
            {isUserLoading ? (
              <Spinner>Processing...</Spinner>
            ) : (
              `Login with ${provider.name}`
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}

export default Login
