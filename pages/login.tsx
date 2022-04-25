import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  useSession,
} from 'next-auth/react'
import Head from 'next/head'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { BuiltInProviderType } from 'next-auth/providers'

import { Spinner } from '../components'
import logo from '../assets/images/spotify.svg'

interface ILoginProps {
  readonly providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >
}

const Login: NextPage<ILoginProps> = ({ providers }) => {
  const session = useSession()
  const [isUserLoading, setUserLoading] = useState(false)

  const handleClick = (providerId: string) => {
    setUserLoading(true)
    signIn(providerId, { callbackUrl: '/' })
  }

  useEffect(() => {
    session.status === 'loading' ? setUserLoading(true) : setUserLoading(false)
  }, [session])

  return (
    <div className="login-page">
      <Head>
        <title>Nextify / Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="content flex h-screen flex-col items-center justify-center bg-black">
        <div className="content-inner">
          <img
            className="logo mx-auto mb-5 max-w-[75px] animate-bounce"
            src={logo.src}
            alt="spotify logo"
          />
          {/* list of providers(1) to sign in with  */}
          {Object.values(providers).map((provider) => (
            <button
              className="max-w-[250px] rounded-full bg-gradient-to-r from-blue px-5 py-2 text-sm text-white transition delay-150 ease-in-out hover:from-blue hover:to-blue"
              key={provider.name}
              onClick={() => handleClick(provider.id)}
            >
              {isUserLoading ? (
                <Spinner>Processing...</Spinner>
              ) : (
                `sign in ${provider.name}`
              )}
            </button>
          ))}
        </div>
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
